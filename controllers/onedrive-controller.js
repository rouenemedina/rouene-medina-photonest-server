import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";
import { Client as graph } from "@microsoft/microsoft-graph-client";
import "dotenv/config";

const knex = initKnex(configuration);
const upload = multer({ dest: "uploads/" });
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const onedriveFolderPath = process.env.ONEDRIVE_FOLDER_PATH;
const driveId = process.env.DRIVE_ID;

const config = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret: clientSecret,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    },
  },
};
const cca = new ConfidentialClientApplication(config);

//get Access Token
const getAccessToken = async () => {
  const clientCredentialRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  try {
    const response = await cca.acquireTokenByClientCredential(
      clientCredentialRequest
    );
    return response.accessToken;
  } catch (err) {
    console.log("Error fetching access token", err);
    throw err;
  }
};
//   const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
//   const params = new URLSearchParams({
//     grant_type: "client_credentials",
//     client_id: clientId,
//     scope: "https://graph.microsoft.com/.default",
//     client_secret: clientSecret,
//   });

//   console.log(params);

//   try {
//     const response = await axios.post(tokenEndpoint, params);
//     console.log(response.data.accessToken);
//     return response.data.access_token;
//   } catch (err) {
//     console.log("Error fetching access token", err);
//   }
// };

// const checkOneDriveConnection = async () => {
//   const accessToken = await getAccessToken();
//   const drive = "https://graph.microsoft.com/v1.0/me/drive";
//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   };

//   console.log("Access Token:", accessToken);
//   console.log("Headers:", headers);

//   try {
//     const response = await axios.get(drive, { headers });
//     console.log("OneDrive connection successful:", response.data);
//   } catch (err) {
//     console.error("Error checking OneDrive connection:", err);
//     if (err.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("Error response data:", err.response.data);
//         console.error("Error response status:", err.response.status);
//         console.error("Error response headers:", err.response.headers);
//       } else if (err.request) {
//         // The request was made but no response was received
//         console.error("Error request:", err.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error message:", err.message);
//       }
//       console.error("Error config:", err.config);
//   }
// };

//upload images to OneDrive
//then get the image url from OneDrive
const uploadToOneDrive = async (filePath, fileName, accessToken) => {
  //const driveUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${onedriveFolderPath}/${fileName}:/content`;
  const driveUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:${onedriveFolderPath}/${fileName}:/content`;
  //creating a readable stream that is located at the filePath
  const filesStream = fs.createReadStream(filePath);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": `image/jpeg`,
  };

  try {
    const response = await axios.put(driveUrl, filesStream, { headers });
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log("Error response data:", err.response.data);
      console.log("Error response status:", err.response.status);
      console.log("Error response headers:", err.response.headers);
    } else if (err.request) {
      console.log("Error request:", err.request);
    } else {
      console.log("Error message:", err.message);
    }
    throw err;
  }
};

const createImgUrl = async (itemId, accessToken) => {
  const sharingUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/createLink`;

  try {
    const response = await axios.post(
      sharingUrl,
      { type: "view" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.link.webUrl;
  } catch (err) {
    console.log("Error creating link: ", err);
    throw err;
  }
};

//POST /upload
const uploadImg = async (req, res) => {
  try {
    //checkOneDriveConnection();
    const file = req.file;
    const { image_title, image_description, image_tags, category_id, user_id } =
      req.body;

    //check if file exist
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        error: "400",
      });
    }

    //check if category_id exist
    if (!category_id) {
      return res.status(400).json({
        message: "No category ID provided.",
        error: "400",
      });
    }
    //check if user_id exist
    if (!user_id) {
      return res.status(400).json({
        message: "No user ID provided.",
        error: "400",
      });
    }

    const accessToken = await getAccessToken();
    const uploadResponse = await uploadToOneDrive(
      file.path,
      file.originalname,
      accessToken
    );
    const imageUrl = await createImgUrl(uploadResponse.id, accessToken);

    //store in "photos" table
    const newImg = {
      image_title,
      image_description,
      category_id,
      user_id,
      image_tags,
      image_url: imageUrl,
    };
    await knex("photos").insert(newImg);

    fs.unlinkSync(file.path);

    res.json({ url: imageUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

export { uploadImg };

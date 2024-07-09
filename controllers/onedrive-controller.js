import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import "dotenv/config";

const knex = initKnex(configuration);
const upload = multer({ dest: "uploads/" });
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const onedriveFolderPath = process.env.ONEDRIVE_FOLDER_PATH;

//get Access Token
const getAccessToken = async () => {
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    client_id: clientId,
    scope: "https://graph.microsoft.com/.default",
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  try {
    const response = await axios.post(tokenEndpoint, params);
    console.log(response.data);
    return response.data.access_token;
  } catch (err) {
    console.log("Error fetching access token", err);
  }
};

//upload images to OneDrive
//then get the image url from OneDrive
const uploadToOneDrive = async (filePath, fileName, fileType, accessToken) => {
  const driveUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${onedriveFolderPath}/${fileName}:/content`;

  //creating a readable stream that is located at the filePath
  const filesStream = fs.createReadStream(filePath);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": `image/${fileType}`,
  };

  const response = await axios.put(driveUrl, filesStream, { headers });
  return response.data;
};

const createImgUrl = async (itemId, accessToken) => {
  const sharingUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/createLink`;

  const response = await axios.post(
    sharingUrl,
    {
      type: "view",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.link.webUrl;
};

//POST /upload
const uploadImg = async (req, res) => {
  try {
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
    }
    //check if user_id exist
    if (!user_id) {
    }
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

    const accessToken = await getAccessToken();
    const uploadResponse = await uploadToOneDrive(
      file.path,
      file.originalname,
      accessToken
    );
    const imageUrl = await createImgUrl(uploadResponse.id, accessToken);

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

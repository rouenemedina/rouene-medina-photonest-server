import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import "dotenv/config";
import { PublicClientApplication as msal } from '@azure/msal-node';
import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";
import { Client as graph } from '@microsoft/microsoft-graph-client';


const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
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

console.log(config);

const cca = new ConfidentialClientApplication(config);

const upload = multer({ dest: "uploads/" });

const uploadImg = async (req, res) => {
  const clientCredentialRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  try {
    const response = await cca.acquireTokenByClientCredential(
      clientCredentialRequest
    );
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, response.accessToken);
      },
    });

    const fileName = req.file.originalname;
    const fileContent = fs.readFileSync(req.file.path);
    const targetDirectory = `me/drive/root:${ONEDRIVE_FOLDER_PATH}`;

    const upload = await client
      .api(`${targetDirectory}/${fileName}:/content`)
      .put(fileContent);

    fs.unlinkSync(req.file.path);

    const sharingLink = await client
      .api(`/me/drive/items/${upload.id}/createLink`)
      .post({ type: "view", scope: "anonymous" });

    res.send(
      "File uploaded successfully. File ID: " +
        upload.id +
        ". Public URL: " +
        sharingLink.link.webUrl
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

export { uploadImg };

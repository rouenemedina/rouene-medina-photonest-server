import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import multer from "multer";
import "dotenv/config";

const knex = initKnex(configuration);

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const onedriveFolderPath = process.env.ONEDRIVE_FOLDER_PATH;

//get Access Token
const getAccessToken = async () => {

};

//upload images to OneDrive
//then get the image url from OneDrive

//POST /upload
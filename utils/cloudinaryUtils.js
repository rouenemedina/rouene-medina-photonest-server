import axios from "axios";
import fs from "fs";
import multer from "multer";
import FormData from "form-data";
import "dotenv/config";

const upload = multer({ dest: "uploads/" });
const cloudName = process.env.CLOUD_NAME;
const cloudSecret = process.env.CLOUD_SECRET;
const cloudKey = process.env.CLOUD_KEY;

const uploadToCloudinaryUsingAxios = async (filePath) => {
  try {
    const formData = new FormData();
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const filesStream = fs.createReadStream(filePath);
    formData.append("file", filesStream);
    formData.append("upload_preset", "photonest_unsigned");
    formData.append("api_key", cloudKey);

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Basic ${Buffer.from(
          `${cloudKey}:${cloudSecret}`
        ).toString("base64")}`,
      },
    });
    return response.data.url;
  } catch (err) {
    console.log("Error uploading file", err);
    throw err;
  }
};

export { uploadToCloudinaryUsingAxios };
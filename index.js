import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
// import oneDriveRoutes from "./routes/onedrive.js";
import cloudinaryRoutes from "./routes/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/upload", cloudinaryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
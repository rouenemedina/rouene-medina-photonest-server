import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import cloudinaryRoutes from "./routes/cloudinary.js";
import heroRoutes from "./routes/hero.js";
import workRoutes from "./routes/work.js";
import aboutRoutes from "./routes/about.js";
import connectRoutes from "./routes/connect.js";
import galleryRoutes from "./routes/gallery.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/upload", cloudinaryRoutes);
app.use("/hero", heroRoutes);
app.use("/work", workRoutes);
app.use("/about", aboutRoutes);
app.use("/connect", connectRoutes);
app.use("/gallery", galleryRoutes);
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
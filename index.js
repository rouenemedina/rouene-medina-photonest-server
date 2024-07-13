import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import cloudinaryRoutes from "./routes/cloudinary.js";
import heroRoutes from "./routes/hero.js";
import workRoutes from "./routes/work.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/upload", cloudinaryRoutes);
app.use("/hero", heroRoutes);
app.use("/work", workRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
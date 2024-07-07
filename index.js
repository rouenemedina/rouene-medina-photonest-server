import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
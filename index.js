import express, { json } from "express";
import RecipeRoutes from "./src/routes/recipes.routes";
import cors from "cors";
import connectDB from "./src/models/dbconnect";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(json());

app.use("/api/recipes", RecipeRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

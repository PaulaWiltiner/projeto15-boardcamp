import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(categoriesRouter);

app.listen(process.env.PORT);

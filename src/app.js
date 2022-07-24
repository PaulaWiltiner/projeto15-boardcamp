import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(categoriesRouter, gamesRouter, customersRouter, rentalsRouter);

app.listen(process.env.PORT, () => {
  console.log("server running ", process.env.PORT);
});

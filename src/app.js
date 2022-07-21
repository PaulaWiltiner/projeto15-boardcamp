import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";
//import gamesRouter from "./routes/gamesRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(categoriesRouter);
//app.use(gamesRouter);

app.listen(process.env.PORT, () => {
  console.log("server running ", process.env.PORT);
});

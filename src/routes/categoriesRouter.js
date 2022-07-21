import {
  postCategories,
  getCategories,
} from "../controllers/categoriesController.js";
import { Router } from "express";
import validateCategories from "../middlewares/validateCategories.js";

const router = Router();

router.post("/categories", validateCategories, postCategories);
router.get("/categories", getCategories);

export default router;

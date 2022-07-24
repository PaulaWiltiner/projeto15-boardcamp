import { postGames, getGames } from "../controllers/gamesController.js";
import { Router } from "express";
import validateGames from "../middlewares/validateGames.js";

const router = Router();

router.post("/games", validateGames, postGames);
router.get("/games", getGames);

export default router;

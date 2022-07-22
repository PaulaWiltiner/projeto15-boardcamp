import { postGames, getGames } from "../controllers/gamesController.js";
import { Router } from "express";

const router = Router();

router.post("/games", postGames);
router.get("/games", getGames);

export default router;

import {
  postRentals,
  getRentals,
  postRentalsReturn,
  deleteRentals,
} from "../controllers/rentalsController.js";
import { Router } from "express";
import {
  validateRentals,
  validateIdRentals,
} from "../middlewares/validateRentals.js";

const router = Router();

router.post("/rentals", validateRentals, postRentals);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", validateIdRentals, postRentalsReturn);
router.delete("/rentals/:id", validateIdRentals, deleteRentals);

export default router;

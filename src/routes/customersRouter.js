import {
  postCustomers,
  getCustomers,
  getOneCustomer,
  putCustomers,
} from "../controllers/customersController.js";
import { Router } from "express";
import {
  validateCustomers,
  validateIdCustomer,
} from "../middlewares/validateCustomers.js";

const router = Router();

router.post("/customers", validateCustomers, postCustomers);
router.get("/customers", getCustomers);
router.get("/customers/:id", validateIdCustomer, getOneCustomer);
router.put("/customers/:id", validateCustomers, putCustomers);

export default router;

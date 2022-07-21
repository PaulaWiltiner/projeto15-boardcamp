import Joi from "joi";
import connection from "../dbStrategy/postgres.js";

export default async function validateCatgeories(req, res, next) {
  const validation = Joi.object({
    name: Joi.string().required(),
  }).validate(req.body.name);
  if (validation.error) {
    return res.sendStatus(400);
  }
  const query = await connection.query(
    `SELECT (${req.body.name}) FROM categories`
  );
  if (query.rows) {
    return res.sendStatus(409);
  }
  next();
}

import Joi from "joi";
import connection from "../dbStrategy/postgres.js";

export default async function validateCatgeories(req, res, next) {
  const validation = Joi.object({
    name: Joi.string().required(),
  }).validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }
  const query = await connection.query(
    `SELECT * FROM categories WHERE name='${req.body.name}'`
  );

  if (query.rows.length !== 0) {
    return res.sendStatus(409);
  }
  next();
}

import Joi from "joi";
import connection from "../dbStrategy/postgres.js";

export default async function validateGames(req, res, next) {
  const validation = Joi.object({
    name: Joi.string().required(),
    stockTotal: Joi.number().positive().greater(0).required(),
    pricePerDay: Joi.number().positive().greater(0).required(),
  }).validate({
    name: req.body.name,
    stockTotal: req.body.stockTotal,
    pricePerDay: req.body.pricePerDay,
  });

  const categoryId = await connection.query(
    `SELECT * FROM categories WHERE id='${req.body.categoryId}'`
  );

  if (validation.error || categoryId.rows.length === 0) {
    return res.sendStatus(400);
  }
  const name = await connection.query(
    `SELECT * FROM games WHERE name='${req.body.name}'`
  );

  if (name.rows.length !== 0) {
    return res.sendStatus(409);
  }
  next();
}

import Joi from "joi";
import connection from "../dbStrategy/postgres.js";

export async function validateRentals(req, res, next) {
  const validation = Joi.object({
    daysRented: Joi.number().positive().greater(0).required(),
  }).validate({
    daysRented: req.body.daysRented,
  });

  const customerId = await connection.query(
    `SELECT * FROM customers WHERE id='${req.body.customerId}'`
  );

  const gameId = await connection.query(
    `SELECT * FROM games WHERE id='${req.body.gameId}'`
  );

  const rentals = await connection.query(
    `SELECT * FROM rentals WHERE "gameId"='${req.body.gameId}'`
  );

  if (
    validation.error ||
    customerId.rows.length === 0 ||
    gameId.rows.length === 0
  ) {
    return res.sendStatus(400);
  }

  if (gameId) {
    if (rentals.rows.length >= gameId.rows[0].stockTotal) {
      return res.sendStatus(400);
    }
  }

  next();
}

export async function validateIdRentals(req, res, next) {
  const rentalsId = await connection.query(
    `SELECT * FROM rentals WHERE id='${req.params.id}'`
  );

  const returnDate = await connection.query(
    `SELECT "returnDate" FROM rentals WHERE id='${req.params.id}'`
  );

  if (rentalsId.rows.length === 0) {
    return res.sendStatus(404);
  }

  if (
    returnDate.rows[0].returnDate !== null &&
    req.route.path === "/rentals/:id/return"
  ) {
    return res.sendStatus(400);
  }

  if (
    returnDate.rows[0].returnDate === null &&
    req.route.path === "/rentals/:id"
  ) {
    return res.sendStatus(400);
  }

  next();
}

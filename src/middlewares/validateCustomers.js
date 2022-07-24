import JoiBase from "joi";
import JoiDate from "@joi/date";
import connection from "../dbStrategy/postgres.js";

const Joi = JoiBase.extend(JoiDate);

export async function validateCustomers(req, res, next) {
  const validation = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string()
      .regex(/^[0-9]{10,11}$/)
      .required(),
    cpf: Joi.string()
      .regex(/^[0-9]{11}$/)
      .required(),
    birthday: Joi.date().format("YYYY-MM-DD"),
  }).validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }
  const { id } = req.params;
  const cpf = await connection.query(
    `SELECT * FROM customers WHERE cpf='${req.body.cpf}'`
  );

  if (cpf.rows.length !== 0 && cpf.rows[0].id !== Number(id)) {
    return res.sendStatus(409);
  }
  next();
}

export async function validateIdCustomer(req, res, next) {
  const cpf = await connection.query(
    `SELECT * FROM customers WHERE cpf='${req.body.cpf}'`
  );

  if (cpf.rows.length === 0) {
    return res.sendStatus(404);
  }
  next();
}

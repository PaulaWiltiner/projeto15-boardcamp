import connection from "../dbStrategy/postgres.js";

export async function postCategories(req, res) {
  try {
    await connection.query(
      `INSERT INTO categories (name) VALUES ('${req.body.name}')`
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getCategories(req, res) {
  try {
    const { limit, offset } = req.query;
    let offsetRental = offset ? offset : "0";
    let limitRental = limit ? `LIMIT ${limit}` : ``;
    const query = await connection.query(
      `SELECT * FROM categories ${limitRental} OFFSET ${offsetRental}`
    );
    const response = query.rows;
    return res.status(200).send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
}

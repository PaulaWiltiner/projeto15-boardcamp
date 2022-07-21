import connection from "../dbStrategy/postgres.js";

export async function postGames(req, res) {
  try {
    await connection.query(
      `INSERT INTO categories (name) VALUES (${req.body.name})`
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  try {
    const query = await connection.query(`SELECT * FROM categories `);
    const response = query.rows;
    return res.status(201).send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
}

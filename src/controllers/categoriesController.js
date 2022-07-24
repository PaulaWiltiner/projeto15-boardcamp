import connection from "../dbStrategy/postgres.js";

export async function postCategories(req, res) {
  try {
    console.log("passou aqui");
    await connection.query(
      `INSERT INTO categories (name) VALUES ('${req.body.name}')`
    );
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getCategories(req, res) {
  try {
    const query = await connection.query(`SELECT * FROM categories`);
    const response = query.rows;
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

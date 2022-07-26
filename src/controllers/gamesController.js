import connection from "../dbStrategy/postgres.js";

export async function postGames(req, res) {
  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${req.body.name}','${req.body.image}', '${req.body.stockTotal}', '${req.body.categoryId}', '${req.body.pricePerDay}')`
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  try {
    const { name, offset, limit, order, desc } = req.query;
    let descGames = desc ? `DESC` : ``;
    let orderGames = order ? `ORDER BY ${order}` : ``;
    let offsetGames = offset ? offset : "0";
    let limitGames = limit ? `LIMIT ${limit}` : ``;
    if (name) {
      const queryName = await connection.query(
        `SELECT * FROM games WHERE name LIKE '${name}%' 
        ${orderGames} ${descGames} 
        ${limitGames} OFFSET ${offsetGames}`
      );
      const response = queryName.rows;
      return res.status(200).send(response);
    }
    const query = await connection.query(
      `SELECT games.*, categories.name as "categoryName" FROM games 
      JOIN categories ON games."categoryId" = categories.id 
      ${orderGames} ${descGames}  
      ${limitGames} OFFSET ${offsetGames}`
    );
    const response = query.rows;
    return res.status(201).send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
}

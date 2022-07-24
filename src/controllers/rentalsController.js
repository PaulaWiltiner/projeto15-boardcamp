import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

export async function postRentals(req, res) {
  try {
    const price = await connection.query(
      `SELECT ("pricePerDay") FROM games WHERE id=${req.body.gameId}`
    );
    const date = dayjs().format("YYYY-MM-DD");
    const priceTotal = price.rows[0].pricePerDay * req.body.daysRented;

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ('${req.body.customerId}','${req.body.gameId}', '${date}', '${req.body.daysRented}', null, ${priceTotal}, null)`
    );
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function postRentalsReturn(req, res) {
  try {
    const { id } = req.params;
    const result = await connection.query(
      `SELECT "rentDate" as "rentDate", "gameId" as "gameId" , "daysRented" as "daysRented" FROM rentals WHERE id=${id}`
    );
    const price = await connection.query(
      `SELECT ("pricePerDay") FROM games WHERE id=${result.rows[0].gameId}`
    );
    const date = dayjs().format("YYYY-MM-DD");
    const diffInMs = new Date(date) - new Date(result.rows[0].rentDate);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    const delayDay = diffInDays - result.rows[0].daysRented;
    const delayPrice =
      (delayDay <= 0 ? 0 : delayDay) * price.rows[0].pricePerDay;
    await connection.query(
      `UPDATE rentals SET "returnDate"='${date}', "delayFee"=${delayPrice} WHERE id =${id}`
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  try {
    const { customerId, offset, limit, gameId } = req.query;
    let gameid = gameId ? gameId : '"gameId"';
    let customerid = customerId ? customerId : '"customerId"';
    let offsetRental = offset ? offset : "0";
    let limitRental = limit ? `LIMIT ${limit}` : ``;
    const query = await connection.query(`
                              SELECT rentals.*, 
                              FORMAT("rentDate"::text,'YYYY-MM-DD') as "rentDate", 
                              FORMAT("returnDate"::text,'YYYY-MM-DD') as "returnDate",
                              (customers.id,customers.name) as customer, 
                              (games.id,games.name,games."categoryId", (SELECT categories.name FROM categories WHERE id= games."categoryId")) as game 
                              FROM rentals
                              JOIN customers ON customers.id = "customerId"
                              JOIN games ON games.id ="gameId"
                              WHERE "customerId"=${customerid} AND "gameId"=${gameid}
                              ${limitRental} OFFSET ${offsetRental}
                              `);
    const list = query.rows;
    const response = list.map((item) => {
      const listCustomer = item.customer.replace(/[\\"()]/g, "").split(",", 2);
      item["customer"] = {
        id: Number(listCustomer[0]),
        name: listCustomer[1],
      };
      const listGame = item.game.replace(/[\\"()]/g, "").split(",", 4);
      item["game"] = {
        id: Number(listGame[0]),
        name: listGame[1],
        categoryId: Number(listGame[2]),
        categoryName: listGame[3],
      };
      return item;
    });
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteRentals(req, res) {
  try {
    await connection.query(`DELETE FROM rentals WHERE id ='${req.params.id}'`);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

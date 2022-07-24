import connection from "../dbStrategy/postgres.js";

export async function postCustomers(req, res) {
  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${req.body.name}','${req.body.phone}', '${req.body.cpf}', '${req.body.birthday}')`
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  try {
    const { cpf, limit, offset } = req.query;
    let offsetRental = offset ? offset : "0";
    let limitRental = limit ? `LIMIT ${limit}` : ``;
    if (cpf) {
      const queryName = await connection.query(
        `SELECT *, FORMAT(birthday::text,'YYYY-MM-DD') as birthday FROM customers WHERE cpf LIKE '${cpf}%' ${limitRental} OFFSET ${offsetRental}`
      );
      const response = queryName.rows;
      return res.status(200).send(response);
    }
    const query = await connection.query(
      `SELECT *, FORMAT(birthday::text,'YYYY-MM-DD') as birthday FROM customers ${limitRental} OFFSET ${offsetRental}`
    );
    const response = query.rows;
    return res.status(200).send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getOneCustomer(req, res) {
  try {
    const { id } = req.params;
    const query = await connection.query(
      `SELECT *, FORMAT(birthday::text,'YYYY-MM-DD') as birthday FROM customers WHERE id = ${id}`
    );
    const response = query.rows;
    return res.status(200).send(response);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function putCustomers(req, res) {
  try {
    const { id } = req.params;
    await connection.query(
      `UPDATE customers SET name='${req.body.name}', phone='${req.body.phone}', cpf='${req.body.cpf}', birthday='${req.body.birthday}' WHERE id = ${id} `
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

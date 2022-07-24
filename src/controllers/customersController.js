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
    const { cpf, limit, offset, order, desc } = req.query;
    let descCustomers = desc ? `DESC` : ``;
    let orderCustomers = order ? `ORDER BY ${order}` : ``;
    let offsetCustomers = offset ? offset : "0";
    let limitCustomers = limit ? `LIMIT ${limit}` : ``;
    if (cpf) {
      const queryName = await connection.query(
        `SELECT *, FORMAT(birthday::text,'YYYY-MM-DD') as birthday FROM customers 
        WHERE cpf LIKE '${cpf}%' 
        ${orderCustomers}  ${descCustomers} 
        ${limitCustomers} OFFSET ${offsetCustomers}`
      );
      const response = queryName.rows;
      return res.status(200).send(response);
    }
    const query = await connection.query(
      `SELECT *, FORMAT(birthday::text,'YYYY-MM-DD') as birthday FROM customers  
      ${orderCustomers} ${descCustomers} 
      ${limitCustomers} OFFSET ${offsetCustomers}`
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

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  database: "node-js-basic",
});

export default pool;

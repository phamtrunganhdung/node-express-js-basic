import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows });
};

let getDetailUserPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return res.render("detailUser.ejs", { dataDetailUser: [user] });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(firstName, lastName, email, address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

module.exports = {
  getHomePage,
  getDetailUserPage,
  createNewUser,
};

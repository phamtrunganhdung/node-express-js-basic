import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows });
};

let getDetailUserPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  console.log([user]);
  return res.render("detailUser.ejs", { dataDetailUser: [user] });
};

module.exports = {
  getHomePage,
  getDetailUserPage,
};

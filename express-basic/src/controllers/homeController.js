import pool from "../configs/connectDB";
import multer from "multer";

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
let deleteAnUser = async (req, res) => {
  let id = req.params.id;
  await pool.execute("DELETE FROM users WHERE id =?", [id]);
  return res.redirect("/");
};

let getFormUpdate = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return res.render("updateUser.ejs", { dataDetailUser: [user] });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE users SET firstName = ?, lastName =?, email = ?, address = ? WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500">
      <br />
      <p>Original name: ${req.file.originalname} </p>
      <br />
      <p>Type: ${req.file.mimetype} </p>
      <br />
      <p>Destination: ${req.file.destination} </p>
      <br />
      <p>Path: ${req.file.path} </p>
      <hr />
      <a href="/upload-file">Upload another image</a>`);
};

let handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload-file">Upload more images</a>';
  res.send(result);
};

module.exports = {
  getHomePage,
  getDetailUserPage,
  createNewUser,
  deleteAnUser,
  getFormUpdate,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles,
};

import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web.js";
import initAPIRoute from "./route/api.js";
require("dotenv").config();
const app = express();
const port = process.env.port || 8080;
import morgan from "morgan";

app.use((req, res, next) => {
  console.log(">>> run into my middleware");
  console.log(req.method);
  next();
});

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

initAPIRoute(app);

app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

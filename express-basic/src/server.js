import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web.js";
require("dotenv").config();
const app = express();
const port = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

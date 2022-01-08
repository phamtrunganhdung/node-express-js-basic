import express from "express";
import homeController from "../controllers/homeController.js";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);

  return app.use("/", router);
};

export default initWebRoute;

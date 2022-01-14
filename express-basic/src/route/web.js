import express from "express";
import homeController from "../controllers/homeController.js";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailUserPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-an-user/:id", homeController.deleteAnUser);
  router.get("/update-user/:id", homeController.getFormUpdate);
  router.post("/update-user", homeController.updateUser);
  return app.use("/", router);
};

export default initWebRoute;

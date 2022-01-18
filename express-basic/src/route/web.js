import express from "express";
import homeController from "../controllers/homeController.js";
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailUserPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-an-user/:id", homeController.deleteAnUser);
  router.get("/update-user/:id", homeController.getFormUpdate);
  router.post("/update-user", homeController.updateUser);
  router.get("/upload-file", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  return app.use("/", router);
};

export default initWebRoute;

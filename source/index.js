const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();

const uploadConfig = require("./mid/upload");
const upload = multer(uploadConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/controleProj")(app);
const postagemController = require("./controllers/postagemController");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/cadastro", upload.array("images"), postagemController.create);

app.listen(3000);

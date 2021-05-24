const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
<<<<<<< Updated upstream

const app = express();
app.use(cors());

=======
const auth = require("./mid/auth");

const app = express();
app.use(cors());
>>>>>>> Stashed changes
const uploadConfig = require("./mid/upload");
const upload = multer(uploadConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/controleProj")(app);
const postagemController = require("./controllers/postagemController");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/postagens", auth, upload.array("images"), postagemController.create);

app.get("/findPost/:title", auth, postagemController.findByTitle);
app.get("/findPost", auth, postagemController.findAll);

app.listen(3000);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Publicacoes = require("./models/publicacoes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/controleProj")(app);

app.post("/cadastro", async function (req, res) {
  const { id, nome, mensagem } = req.body;

  const data = await Publicacoes.create({ id, nome, mensagem });

  return res.json(data);
});

app.listen(3000);

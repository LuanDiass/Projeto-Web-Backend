const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configuracao/auth");
const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86000,
  });
}

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Falha no registro" });
  }
});


router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "Usuario nao encontrado" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Senha invalida" });
  }

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

module.exports = (app) => app.use("/auth", router);

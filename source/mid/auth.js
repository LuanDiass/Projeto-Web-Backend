const jwt = require("jsonwebtoken");
const authConfig = require("../configuracao/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Sem token de autorizacao" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Erro no token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: "Token malformed" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token invalido" });
    }

    req.userId = decoded.id;
    return next();
  });
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const PublicacoesSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  text: {
    type: "string",
  },
  image: {
    url: {
      type: "string",
    },
  },
});

module.exports = mongoose.model("Publicacoes", PublicacoesSchema);

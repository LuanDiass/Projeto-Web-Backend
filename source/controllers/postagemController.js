const express = require("express");
const mongoose = require("mongoose");

const Postagem = require("../models/postagem");

module.exports = {
  async create(request, response) {
    const { title, text } = request.body;

    if (!title) {
      return response.status(400).send({ error: "Sem titulo" });
    }

    const requestImages = request.files;

    const images = await requestImages.map((image) => {
      return { path: image.filename };
    });

    const image = `http://localhost:3000/uploads/${images[0].path}`;

    const data = {
      title,
      text,
      image,
    };

    const post = await Postagem.create(data);

    return response.send({
      post,
    });
  },

  async findByTitle(request, response) {
    const post = await Postagem.find({
      title: { $regex: request.params.title, $options: "i" },
    });

    return response.send(post);
  },

  async findAll(request, response) {
    const post = await Postagem.find();
    return response.send(post);
  },
};

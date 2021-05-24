module.exports = {
  render(images) {
    return {
      id: images.id,
      url: `http://localhost:3001/uploads/${images[0].path}`,
    };
  },
};

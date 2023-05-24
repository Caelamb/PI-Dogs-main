const { Temperaments } = require("../db");

const getTemperaments = async () => {
  try {
    const temperaments = await Temperaments.findAll();

    return temperaments;
  } catch (error) {
    console.error(err);
    throw new Error("Ocurrió un error al obtener los temperamentos");
  }
};

module.exports = {
  getTemperaments,
};

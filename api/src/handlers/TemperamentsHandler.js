const { getTemperaments } = require("../controllers/TemperamentsControllers");

const getTemperamentsHandler = async (req, res) => {
  try {
    const temperaments = await getTemperaments();

    res.json(temperaments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los temperamentos" });
  }
};

module.exports = {
  getTemperamentsHandler,
};

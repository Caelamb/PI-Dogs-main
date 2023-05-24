const { getAllDogs, getDogById } = require("../controllers/DogsControllers");

const getDogs = async (req, res) => {
  try {
    const dogs = await getAllDogs();
    res.status(200).json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in the server" });
  }
};

const getDogByIdHandler = async (req, res) => {
    const { idRaza } = req.params;
  
    try {
      const dog = await getDogById(idRaza);
      res.status(200).json(dog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error in the server' });
    }
  };

module.exports = { 
    getDogs,
    getDogByIdHandler, 
};

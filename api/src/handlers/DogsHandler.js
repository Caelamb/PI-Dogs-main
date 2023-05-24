const { getAllDogs, getDogById } = require("../controllers/DogsControllers");
const { getDogsByName, createDog } = require("../controllers/DogsControllers");

// const getDogs = async (req, res) => {
//   try {
//     const dogs = await getAllDogs();
//     res.status(200).json(dogs);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error in the server" });
//   }
// };

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

  const getDogsByNameAndAllHandler = async (req, res) => {
    try {
      const { name } = req.query;
  
      if (!name) {
        const dogs = await getAllDogs(); // Obtener lista completa de razas de perros
        return res.json(dogs);
      }
  
      const dogs = await getDogsByName(name);
  
      if (dogs.length === 0) {
        return res.status(404).json({ message: "No se encontraron razas de perros con ese nombre." });
      }
  
      return res.json(dogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  const createDogHandler = async (req, res) => {
    const { image, name, height, weight, life_span, temperaments } = req.body;

    try {
  
      const Dog = await createDog(image, name, height, weight, life_span, temperaments);
  
      return res.status(201).json(Dog);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  };

module.exports = { 
    getDogByIdHandler,
    getDogsByNameAndAllHandler,
    createDogHandler,
};

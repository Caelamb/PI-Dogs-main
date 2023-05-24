const axios = require("axios");
const { Dogs, Temperaments } = require("../db");
const { API_KEY } = process.env;

const getAllDogs = async () => {
    try {
      const dogs = await Dogs.findAll();
      return dogs;
    } catch (err) {
      console.error(err);
      throw new Error("Error in the server");
    }
  };

  const getDogById = async (idRaza) => {
    try {
      // Buscar la raza de perro en la base de datos
      const dog = await Dogs.findByPk(idRaza, { include: Temperaments });
  
      if (dog) {
        const temperaments = dog.Temperaments.map(temperament => temperament.name).join(", ");
  
        return {
          id: dog.id,
          image: dog.image,
          name: dog.name,
          height: dog.height,
          weight: dog.weight,
          life_span: dog.life_span,
          temperaments
        };
      }
  
      // Si no se encuentra en la base de datos, buscar en la API
      const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}?key=${API_KEY}`);
  
      const dogDetail = {
        id: data.id,
        image: data.image.url,
        name: data.name,
        height: data.height.metric,
        weight: data.weight.metric,
        life_span: data.life_span,
        temperaments: data.temperament ? data.temperament.split(", ").join(", ") : ""
      };
  
      return dogDetail;
    } catch (error) {
      console.error(error);
      throw new Error("Ocurrió un error al obtener el detalle de la raza de perro");
    }
  };
  
  
  module.exports = { 
    getAllDogs,
    getDogById, 
};
  
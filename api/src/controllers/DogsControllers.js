const axios = require("axios");
const { Dogs, Temperaments } = require("../db");
const { Op } = require("sequelize")
const { API_KEY } = process.env;

const getAllDogs = async () => {
    try {
      const dogs = await Dogs.findAll({
        include: Temperaments,
        order: [['id', 'ASC']], // Ordenar por ID de forma ascendente
      });
      const formattedDogs = dogs.map((dog) => {
        const temperaments = dog.Temperaments.map((temperament) => temperament.name).join(', ');
        
        return {
          id: dog.id,
          image: dog.image,
          name: dog.name,
          height: dog.height,
          weight: dog.weight,
          life_span: dog.life_span,
          temperaments: temperaments
        };
      });
      return formattedDogs;
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

  const getDogsByName = async (searchName) => {
    try {
      const lowercaseName = searchName.toLowerCase();

      // Buscar en la base de datos
      const dbDogs = await Dogs.findAll({
        where: {
          name: {
            [Op.iLike]: `%${lowercaseName}`,
          },
        },
        include: [
          {
            model: Temperaments,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      // Realizar una solicitud a la API 
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${lowercaseName}&api_key=${API_KEY}`)
      const apiDogs = response.data;

      // Combinar los resultados de la base de datos y la API eliminando duplicados
      const dogsSet = new Set([...dbDogs, ...apiDogs]);
      const dogs = Array.from(dogsSet) 

    // Generar cadena de texto con los temperamentos
    const dogsWithTemperaments = dogs.map((dog) => {
      const temperaments =  dog.Temperaments ? dog.Temperaments.map((temperament) => temperament.name) : [];
      const dogWithTemperaments = {
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperaments: temperaments.join(", "),
      };
      return dogWithTemperaments;
    });

    return dogsWithTemperaments;
    } catch (error) {
      console.error(error);
      throw new Error("Error en el servidor");
    }
  };
  
  const createDog = async (image, name, height, weight, life_span, temperaments) => {
    try {
      const lastDog = await Dogs.findOne({
        order: [['id', 'DESC']],
        attributes: ['id'],
      });
  
      let newId;
      if (lastDog) {
        newId = lastDog.id + 1;
      } else {
        // En caso de que no haya ningún perro registrado, asignar el id inicial
        newId = 1;
      }
  
      const dog = await Dogs.create({
        id: newId,
        image,
        name,
        height,
        weight,
        life_span,
      });
  
      const temperamentsArray = temperaments.split(",").map((temperament) => temperament.trim());
  
      for (const temperament of temperamentsArray) {
        const [dbTemperament] = await Temperaments.findOrCreate({
          where: {
            name: temperament,
          },
        });
        await dog.addTemperament(dbTemperament);
      }
  
      const response = {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperaments: temperamentsArray,
      };
  
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error en el servidor");
    }
  };  
  
  
  module.exports = { 
    getAllDogs,
    getDogById,
    getDogsByName,
    createDog,
};
  
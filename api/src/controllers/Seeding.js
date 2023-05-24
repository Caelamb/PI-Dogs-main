const axios = require("axios");
const { Dogs, Temperaments } = require("../db");
const { API_KEY } = process.env;
const API_URL = `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`;

const seedTemperaments = async () => {
    try {
      // Obtener temperamentos desde la API
      const response = await axios.get(API_URL);
      const breeds = response.data;
      const temperamentsSet = new Set();
  
      // Obtener los temperamentos únicos de todas las razas
      breeds.forEach(breed => {
        if (breed.temperament) {
          const breedTemperaments = breed.temperament.split(', ');
          breedTemperaments.forEach(temperament => {
            temperamentsSet.add(temperament);
          });
        }
      });
  
      // Crear un array de objetos con los temperamentos, asignando un ID único a cada uno
      const temperamentsData = Array.from(temperamentsSet).map((temperament, index) => {
        return {
          id: index + 1, // Asignar un ID único basado en el índice
          name: temperament,
        };
      });
  
      // Guardar los temperamentos en la base de datos
      await Temperaments.bulkCreate(temperamentsData, { ignoreDuplicates: true });
  
      console.log('Temperaments seeded successfully');
    } catch (error) {
      console.error('Error seeding temperaments:', error);
    }
  };
  
  const seedDatabase = async () => {
    try {
      // Realizar solicitud a la API para obtener los datos de los perros
      const response = await axios.get(API_URL);
      const breeds = response.data;
      const dogsData = breeds.map(breed => {
        return {
          id: breed.id, // Utilizar el ID proporcionado por la API
          image: breed.image.url,
          name: breed.name,
          height: breed.height.metric,
          weight: breed.weight.metric,
          life_span: breed.life_span,
        };
      });
  
      // Crear temperamentos en la base de datos
      await seedTemperaments();
  
      // Obtener los temperamentos desde la base de datos
      const temperaments = await Temperaments.findAll();
  
      // Guardar los perros en la base de datos
      await Dogs.bulkCreate(dogsData, { ignoreDuplicates: true });
  
    // Asociar temperamentos a los perros
    const dogs = await Dogs.findAll();
    for (let i = 0; i < dogs.length; i++) {
      const dog = dogs[i];
      const breed = breeds.find(breed => breed.id === dog.id);
      const dogTemperaments = breed.temperament ? breed.temperament.split(", ") : [];
      const dogTemperamentIds = temperaments
        .filter(temperament => dogTemperaments.includes(temperament.name))
        .map(temperament => temperament.id);
      await dog.addTemperaments(dogTemperamentIds); // Asociar los temperamentos correspondientes al perro
    }
  
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  
  module.exports = { seedDatabase };
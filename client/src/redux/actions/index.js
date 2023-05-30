import axios from "axios";

export const FETCH_ALL_DOGS_SUCCESS = "FETCH_ALL_DOGS_SUCCESS";
export const SEARCH_DOG_BY_NAME_SUCCESS = "SEARCH_DOG_BY_NAME_SUCCESS";
export const FETCH_DOG_BY_ID_SUCCESS = "FETCH_DOG_BY_ID_SUCCESS";
export const FETCH_ALL_TEMPERAMENTS_SUCCESS = "FETCH_ALL_TEMPERAMENTS_SUCCESS";
export const CREATE_DOG_SUCCESS = "CREATE_DOG_SUCCESS";
export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
export const FILTER_DOGS_BY_ORIGIN = "FILTER_DOGS_BY_ORIGIN";
export const SORT_DOGS_BY_ALPHABET = "SORT_DOGS_BY_ALPHABET";
export const SORT_DOGS_BY_WEIGHT = "SORT_DOGS_BY_WEIGHT";
export const CHANGE_PAGE = "CHANGE_PAGE";

const BASE_URL = "http://localhost:3001";

// Acción para obtener todos los perros
export const fetchAllDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/dogs`);
      const dogs = response.data;

      dispatch({
        type: FETCH_ALL_DOGS_SUCCESS,
        payload: dogs,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Acción para buscar un perro por nombre
export const searchDogByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${BASE_URL}/dogs?name=${name}`);
        const dogs = response.data;
  
        dispatch({
          type: SEARCH_DOG_BY_NAME_SUCCESS,
          payload: dogs,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  // Acción para obtener un perro por ID
  export const fetchDogById = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${BASE_URL}/dogs/${id}`);
        const dog = response.data;
  
        dispatch({
          type: FETCH_DOG_BY_ID_SUCCESS,
          payload: dog,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  // Acción para obtener todos los temperamentos
  export const fetchAllTemperaments = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${BASE_URL}/temperaments`);
        const temperaments = response.data;
  
        dispatch({
          type: FETCH_ALL_TEMPERAMENTS_SUCCESS,
          payload: temperaments,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  // Acción para crear un nuevo perro
  export const createDog = (newDog) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${BASE_URL}/dogs`, newDog);
        const createdDog = response.data;
  
        dispatch({
          type: CREATE_DOG_SUCCESS,
          payload: createdDog,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

// Acción para filtrar por temperamento
  export const filterDogsByTemperament = (temperament) => {
    return {
      type: FILTER_DOGS_BY_TEMPERAMENT,
      payload: temperament,
    };
  };
  
// Acción para filtrar por origen (API o base de datos)
export const filterDogsByOrigin = (origin) => {
  return {
    type: FILTER_DOGS_BY_ORIGIN,
    payload: origin,
  };
};


  // Acción para ordenar las razas de perros por orden alfabético
  export const sortDogsByAlphabet = (order) => {
    return {
      type: SORT_DOGS_BY_ALPHABET,
      payload: order,
    };
  };

  // Acción para ordenar las razas de perros por peso
  export const sortDogsByWeight = (order) => {
    return {
      type: SORT_DOGS_BY_WEIGHT,
      payload: order,
    };
  };
  
// Acción para la pagination
export const changePage = (pageNumber) => {
  return {
    type: CHANGE_PAGE,
    payload: pageNumber,
  };
};

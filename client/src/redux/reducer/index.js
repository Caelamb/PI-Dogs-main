import {
  FETCH_ALL_DOGS_SUCCESS,
  SEARCH_DOG_BY_NAME_SUCCESS,
  FETCH_DOG_BY_ID_SUCCESS,
  FETCH_ALL_TEMPERAMENTS_SUCCESS,
  CREATE_DOG_SUCCESS,
  FILTER_DOGS_BY_TEMPERAMENT,
  FILTER_DOGS_BY_ORIGIN,
  SORT_DOGS_BY_ALPHABET,
  SORT_DOGS_BY_WEIGHT,
  CHANGE_PAGE,
} from '../actions/index';

const initialState = {
  dogs: [],
  copyDogs: [],
  dogDetails: null,
  temperaments: [],
  currentPage: 1,
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DOGS_SUCCESS:
      return {
        ...state,
        dogs: action.payload,
        copyDogs: action.payload,
      };

    case SEARCH_DOG_BY_NAME_SUCCESS:
      return {
        ...state,
        dogs: action.payload,
        currentPage: 1
      };

    case FETCH_DOG_BY_ID_SUCCESS:
      return {
        ...state,
        dogDetails: action.payload,
      };

    case FETCH_ALL_TEMPERAMENTS_SUCCESS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case CREATE_DOG_SUCCESS:
      return {
        ...state
      };

    case FILTER_DOGS_BY_TEMPERAMENT:
      const selectedTemperament = action.payload;
      let filteredByTemperament = state.copyDogs;
    
      if (selectedTemperament) {
        filteredByTemperament = filteredByTemperament.filter((dog) => {
          // Convertir la cadena de temperamentos en un array
          const temperamentsArray = dog.temperaments.split(", ");
    
          // Verificar si el perro tiene el temperamento seleccionado
          return temperamentsArray.includes(selectedTemperament);
        });
      }
    
      return {
        ...state,
        dogs: filteredByTemperament,
        currentPage: 1,
      };

    case FILTER_DOGS_BY_ORIGIN:
      const origin = action.payload;
      let filteredDogs;
    
      if (origin === 'created') {
        filteredDogs = state.copyDogs.filter((dog) => dog.id >= 265);
      } else if (origin === 'api') {
        filteredDogs = state.copyDogs.filter((dog) => dog.id < 265);
      } else {
        filteredDogs = state.copyDogs; // Utilizar la lista original en lugar de una nueva propiedad
      }
    
      return {
        ...state,
        dogs: filteredDogs, // Actualizar la lista de perros en lugar de filteredDogs
        currentPage: 1,
      };
      
    case SORT_DOGS_BY_ALPHABET:
      const alphabetOrder = action.payload;
      let sortedByAlphabet;
    
      if (alphabetOrder === 'asc') {
        sortedByAlphabet = state.copyDogs.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (alphabetOrder === 'desc') {
        sortedByAlphabet = state.copyDogs.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else {
        sortedByAlphabet = state.copyDogs; // Restaurar la lista original
      }
      return {
        ...state,
        dogs: sortedByAlphabet,
        currentPage: 1
      };

      case SORT_DOGS_BY_WEIGHT:
        const weightOrder = action.payload;
        let sortedByWeight;
      
        if (weightOrder === 'asc') {
          sortedByWeight = state.copyDogs.slice().sort((a, b) => {
            const aWeight = parseFloat(a.weight.split(' - ')[0]);
            const bWeight = parseFloat(b.weight.split(' - ')[0]);
            return aWeight - bWeight;
          });
        } else if (weightOrder === 'desc') {
          sortedByWeight = state.copyDogs.slice().sort((a, b) => {
            const aWeight = parseFloat(a.weight.split(' - ')[0]);
            const bWeight = parseFloat(b.weight.split(' - ')[0]);
            return bWeight - aWeight;
          });
        } else {
          sortedByWeight = state.copyDogs; // Restaurar la lista original
        }
      
        return {
          ...state,
          dogs: sortedByWeight,
          currentPage: 1
        };
      
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default dogReducer;

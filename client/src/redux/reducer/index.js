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
    filters: {
      temperament: null,
      origin: null,
    },
    sort: {
      alphabet: null,
      weight: null,
    },
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
          ...state,
          dogs: [...state.dogs, action.payload],
          copyDogs: [...state.copyDogs, action.payload],
        };
  
      case FILTER_DOGS_BY_TEMPERAMENT:
        return {
          ...state,
          filters: {
            ...state.filters,
            temperament: action.payload,
          },
        };
  
      case FILTER_DOGS_BY_ORIGIN:
        return {
          ...state,
          filters: {
            ...state.filters,
            origin: action.payload,
          },
        };
  
      case SORT_DOGS_BY_ALPHABET:
        return {
          ...state,
          sort: {
            ...state.sort,
            alphabet: action.payload,
          },
        };
  
      case SORT_DOGS_BY_WEIGHT:
        return {
          ...state,
          sort: {
            ...state.sort,
            weight: action.payload,
          },
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
  
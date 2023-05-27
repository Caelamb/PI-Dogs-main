import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllDogs,
  searchDogByName,
  fetchAllTemperaments,
  filterDogsByTemperament,
  filterDogsByOrigin,
  sortDogsByAlphabet,
  sortDogsByWeight,
  changePage,
} from '../../redux/actions/index';

import Cards from '../../components/cards/Cards.jsx';
import Filters from '../../components/filter/Filters.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments)
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(fetchAllDogs());
    dispatch(fetchAllTemperaments());
  }, [dispatch]);

  const handleSearch = (name) => {
    dispatch(searchDogByName(name));
  };

  const handleFilterByTemperament = (temperament) => {
    dispatch(filterDogsByTemperament(temperament));
  };

  const handleFilterByOrigin = (origin) => {
    dispatch(filterDogsByOrigin(origin));
  };

  const handleSortByAlphabet = (order) => {
    dispatch(sortDogsByAlphabet(order));
  };

  const handleSortByWeight = (order) => {
    dispatch(sortDogsByWeight(order));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(changePage(pageNumber));
  };

    // Lógica de paginación y límite de perros por página
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedDogs = dogs.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Filters
        onFilterByTemperament={handleFilterByTemperament}
        onFilterByOrigin={handleFilterByOrigin}
        onSortByAlphabet={handleSortByAlphabet}
        onSortByWeight={handleSortByWeight}
        temperaments={temperaments}
      />
      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={Math.ceil(dogs.length / itemsPerPage)}
      />
      <Cards dogs={displayedDogs} />
    </div>
  );
};

export default Home;

// En el componente Filters.jsx

import React from 'react';

const Filters = ({
  onFilterByTemperament,
  onFilterByOrigin,
  onSortByAlphabet,
  onSortByWeight,
  temperaments, // Array de objetos con los temperamentos disponibles
}) => {
  const handleTemperamentChange = (event) => {
    const selectedTemperament = event.target.value;
    onFilterByTemperament(selectedTemperament);
  };

  const handleOriginChange = (event) => {
    const selectedOrigin = event.target.value;
    onFilterByOrigin(selectedOrigin);
  };

  const handleAlphabetSortChange = (event) => {
    const selectedOrder = event.target.value;
    onSortByAlphabet(selectedOrder);
  };

  const handleWeightSortChange = (event) => {
    const selectedOrder = event.target.value;
    onSortByWeight(selectedOrder);
  };

  return (
    <div>
      <div>
        <label htmlFor="temperamentFilter">Temperament:</label>
        <select id="temperamentFilter" onChange={handleTemperamentChange}>
          <option value="">All</option>
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="originFilter">Origin:</label>
        <select id="originFilter" onChange={handleOriginChange}>
          <option value="">All</option>
          {/* Renderizar opciones de origen */}
        </select>
      </div>
      <div>
        <label htmlFor="alphabetSort">Alphabetical Sort:</label>
        <select id="alphabetSort" onChange={handleAlphabetSortChange}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div>
        <label htmlFor="weightSort">Weight Sort:</label>
        <select id="weightSort" onChange={handleWeightSortChange}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;


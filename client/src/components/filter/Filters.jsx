// En el componente Filters.jsx

import React from 'react';
import styles from "../filter/filters.module.css";

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
    <div className={`${styles['filters-container']}`}>
      <div className={styles['filters-item']}>
        <label className={styles['label']} htmlFor="temperamentFilter">Temperament:</label>
        <select className={styles['select']} id="temperamentFilter" onChange={handleTemperamentChange}>
          <option value="">All dogs</option>
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles['label']} htmlFor="originFilter">Origin:</label>
        <select className={styles['select']} id="originFilter" onChange={handleOriginChange}>
          <option value="">All dogs</option>
          <option value="api">API</option>
          <option value="created">Created</option>
        </select>
      </div>
      <div>
        <label className={styles['label']} htmlFor="alphabetSort">Alphabetical Sort:</label>
        <select className={styles['select']} id="alphabetSort" onChange={handleAlphabetSortChange}>
          <option value="">All dogs</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div>
        <label className={styles['label']} htmlFor="weightSort">Weight Sort:</label>
        <select className={styles['select']} id="weightSort" onChange={handleWeightSortChange}>
          <option value="">All dogs</option>
          <option value="asc">Weight-min</option>
          <option value="desc">Weight-max</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;


import React from 'react';
import Card from '../card/Card.jsx';
import styles from "../cards/cards.module.css";

const Cards = ({ dogs }) => {
  if(!dogs || dogs.length === 0) {
    return <div>No se encontraron resultados</div>
  }
  return (
    <div className={styles['card-list']}>
      {dogs?.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default Cards;

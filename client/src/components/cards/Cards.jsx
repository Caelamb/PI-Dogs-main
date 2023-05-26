import React from 'react';
import Card from '../card/Card.jsx';

const Cards = ({ dogs }) => {
  if(!dogs || dogs.length === 0) {
    return <div>No se encontraron resultados</div>
  }
  return (
    <div>
      {dogs?.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default Cards;

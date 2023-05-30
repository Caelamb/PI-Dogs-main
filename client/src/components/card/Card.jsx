import React from 'react';
import styles from '../card/card.module.css';
import { Link } from "react-router-dom";

const Card = ({ dog }) => {
  const { image, name, temperaments, weight } = dog;

  return (
    <div className={styles.card}>
      <Link to={`/detail/${dog.id}`}>
      <img src={image} alt={name} className={styles['card-image']} />
      <div className={styles['card-details']}>
        <h2 className={styles['card-name']}>{name}</h2>
        <p className={styles['card-temperaments']}>
          Temperaments: {temperaments}
        </p>
        <p className={styles['card-weight']}>Weight: {weight}</p>
      </div>
      </Link>
    </div>
  );
};

export default Card;
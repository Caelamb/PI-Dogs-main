import React from 'react';
import styles from '../card/card.module.css';

const Card = ({ dog }) => {
  const { image, name, temperaments, weight } = dog;

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles['card-image']} />
      <div className={styles['card-details']}>
        <h2 className={styles['card-name']}>{name}</h2>
        <p className={styles['card-temperaments']}>
          Temperaments: {temperaments}
        </p>
        <p className={styles['card-weight']}>Weight: {weight}</p>
      </div>
    </div>
  );
};

export default Card;
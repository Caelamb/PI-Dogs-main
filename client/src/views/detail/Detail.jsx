import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogById } from "../../redux/actions/index";
import { useParams, Link } from "react-router-dom";
import styles from "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector(state => state.dogDetails);

  useEffect(() => {
    dispatch(fetchDogById(id));
  }, [dispatch, id]);

  if (!dog) {
    return <div>Cargando detalle del perro...</div>;
  }

  const {
    image,
    name,
    height,
    weight,
    temperaments,
    life_span
  } = dog;

  return (
    <div className={styles.container}>
      <h2>DETAIL PAGE</h2>
      <div>
        <p>ID: {id}</p>
        <img src={image} alt={name} />
        <p>Nombre: {name}</p>
        <p>Altura: {height}</p>
        <p>Peso: {weight}</p>
        <p>Temperamentos: {temperaments}</p>
        <p>Años de vida: {life_span}</p>
      </div>
      <Link to="/home" className={styles.button}>
        Volver a la página principal
      </Link>
    </div>
  );
};

export default Detail;
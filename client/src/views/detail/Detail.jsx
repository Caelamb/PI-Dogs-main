import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogById } from "../../redux/actions/index";
import { useParams, Link } from "react-router-dom";
import styles from "../detail/detail.module.css";

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
      <div>
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.Alls}>ID: {id}</p>
        <p className={styles.name}>Nombre: {name}</p>
        <p className={styles.All}>Altura: {height}</p>
        <p className={styles.All}>Peso: {weight}</p>
        <p className={styles.All}>Temperamentos: {temperaments}</p>
        <p className={styles.All}>Años de vida: {life_span}</p>
      </div>
      <Link to="/home" className={styles.button}>
        Volver a la página principal
      </Link>
    </div>
  );
};

export default Detail;
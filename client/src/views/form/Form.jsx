import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, fetchAllTemperaments } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);

  const [formValues, setFormValues] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAllTemperaments());
  }, [dispatch]);

  const validateForm = () => {
    let errors = {};

    if (formValues.name === "" || /\d/.test(formValues.name)) {
      errors.name = "Ingrese un nombre válido";
    }

    if (formValues.height === "") {
      errors.height = "Ingrese una altura válida";
    }

    if (formValues.weight === "") {
      errors.weight = "Ingrese un peso válido";
    }

    if (formValues.life_span === "") {
      errors.life_span = "Ingrese una vida útil";
    }

    if (formValues.temperaments.length === 0) {
      errors.temperaments = "Seleccione al menos un temperamento";
    }

    if (formValues.image === "") {
      errors.image = "Seleccione una imagen";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value, options } = event.target;

    if (name === "temperaments") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormValues({ ...formValues, [name]: selectedOptions });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      const selectedTemperaments = formValues.temperaments.join(", ");
      const adjustedFormValues = {
        ...formValues,
        temperaments: selectedTemperaments
      };
  
      dispatch(createDog(adjustedFormValues));
  
      setFormValues({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
    }
  };
  
  const handleOptionClick = (event) => {
    const { value } = event.target;
  
    if (formValues.temperaments.includes(value)) {
      const updatedTemperaments = formValues.temperaments.filter(
        temperament => temperament !== value
      );
      setFormValues({ ...formValues, temperaments: updatedTemperaments });
    } else {
      const updatedTemperaments = [...formValues.temperaments, value];
      setFormValues({ ...formValues, temperaments: updatedTemperaments });
    }
  };

  return (
    <div className={styles.container}>
      <h2>FORM PAGE</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="height">Altura:</label>
          <input
            type="text"
            id="height"
            name="height"
            value={formValues.height}
            onChange={handleInputChange}
            required
          />
          {errors.height && <span className={styles.error}>{errors.height}</span>}
        </div>
        <div>
          <label htmlFor="weight">Peso:</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formValues.weight}
            onChange={handleInputChange}
            required
          />
          {errors.weight && <span className={styles.error}>{errors.weight}</span>}
        </div>
        <div>
          <label htmlFor="life_span">Años de Vida:</label>
          <input
            type="text"
            id="life_span"
            name="life_span"
            value={formValues.life_span}
            onChange={handleInputChange}
            required
          />
          {errors.life_span && <span className={styles.error}>{errors.life_span}</span>}
        </div>
        <div>
          <label htmlFor="image">Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formValues.image}
            onChange={handleInputChange}
            required
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>
        <div>
          <label htmlFor="temperaments">Temperamentos:</label>
          <select
            id="temperaments"
            name="temperaments"
            multiple
            value={formValues.temperaments}
            onChange={handleOptionClick}
            required
          >
            <option value="">Seleccione temperamentos</option>
            {temperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.name}>
                {temperament.name}
              </option>
            ))}
          </select>
          {errors.temperaments && <span className={styles.error}>{errors.temperaments}</span>}
        </div>
        <button type="submit">Crear raza</button>
        <Link to="/home" className={styles.button}>Volver a la página principal</Link>
      </form>
    </div>
  );
};

export default Form;

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
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
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

    if (formValues.height_min === "") {
      errors.height_min = "Ingrese una altura mínima válida";
    }

    if (formValues.height_max === "") {
      errors.height_max = "Ingrese una altura máxima válida";
    }

    if (formValues.weight_min === "" || formValues.weight_min < 1) {
      errors.weight_min = "Ingrese un peso mínimo válido (mínimo 1)";
    }
  
    if (formValues.weight_max === "" || formValues.weight_max > 80) {
      errors.weight_max = "Ingrese un peso máximo válido (máximo 80)";
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
      const height = `${formValues.height_min} - ${formValues.height_max}`;
      const weight = `${formValues.weight_min} - ${formValues.weight_max}`;
  
      const adjustedFormValues = {
        ...formValues,
        temperaments: selectedTemperaments,
        height: height,
        weight: weight,
      };
  
      if (formValues.weight_min >= 1 && formValues.weight_max <= 80) {
        dispatch(createDog(adjustedFormValues));
      } else {
        // Mostrar mensaje de error indicando que los valores de peso son inválidos
        // o realizar alguna otra acción correspondiente
        console.log("Los valores de peso son inválidos");
      }
  
      setFormValues({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
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
          <label htmlFor="height_min">Altura mínima:</label>
          <input
            type="number"
            id="height_min"
            name="height_min"
            value={formValues.height_min}
            onChange={handleInputChange}
            required
          />
          {errors.height_min && <span className={styles.error}>{errors.height_min}</span>}
        </div>
        <div>
          <label htmlFor="height_max">Altura máxima:</label>
          <input
            type="number"
            id="height_max"
            name="height_max"
            value={formValues.height_max}
            onChange={handleInputChange}
            required
          />
          {errors.height_max && <span className={styles.error}>{errors.height_max}</span>}
        </div>
        <div>
          <label htmlFor="weight_min">Peso mínimo:</label>
          <input
            type="number"
            id="weight_min"
            name="weight_min"
            value={formValues.weight_min}
            onChange={handleInputChange}
            required
            min="1"
          />
          {errors.weight_min && <span className={styles.error}>{errors.weight_min}</span>}
        </div>
        <div>
          <label htmlFor="weight_max">Peso máximo:</label>
          <input
            type="number"
            id="weight_max"
            name="weight_max"
            value={formValues.weight_max}
            onChange={handleInputChange}
            required
            max="80"
          />
          {errors.weight_max && <span className={styles.error}>{errors.weight_max}</span>}
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

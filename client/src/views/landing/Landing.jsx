import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";

const Landing = () => {
    return (
        <div className={styles}>
            <Link to="/home" >
                Ingresar a la Home Page
            </Link>
        </div>
    );
};

export default Landing;
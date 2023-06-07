import React from "react";
import { Link } from "react-router-dom";
import styles from "../landing/landing.module.css";

const Landing = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text} >Henry's dogs</h1>
            <Link to="/home" className={styles["button"]}>
                Ingresar a la Home Page
            </Link>
        </div>
    );
};

export default Landing;
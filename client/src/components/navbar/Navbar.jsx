import React, { useState } from 'react'
import styles from "../navbar/navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSumit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <div className={styles.navbar}>
      <form onSubmit={handleSumit}>
        <input 
           placeholder='Search...'
           value={searchTerm}
           onChange={(event) => setSearchTerm(event.target.value)}/>
        <button type='submit' >Search</button>
      </form>
      <Link to="/form" className={styles.button}>Create videogame</Link>
    </div>
  )
}

export default Navbar

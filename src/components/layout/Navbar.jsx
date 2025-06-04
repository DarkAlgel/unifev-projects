//Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import styles from "./Navbar.module.css";
import Logo from "../FunctionLogo";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* 🔷 Logo */}
        <div className={styles.logoContainer}>
          <Logo />
        </div>

        {/* 🔗 Links principais */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Início</Link>
          <Link to="/Grafo" className={styles.navLink}>Grafos</Link>
          <Link to="/voz" className={styles.navLink}>Voz</Link>
          <Link to="/contact" className={styles.navLink}>Contato</Link>
          <Link to="/projects" className={styles.navLink}>Projetos</Link>
        </div>

        {/* 🔹 Seletor de idioma */}
        <div className={styles.navActions}>
          <div className={styles.languageSelector}>
            <FaGlobe className={styles.icon} />
            <select>
              <option value="pt">PT</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🔎 Barra de Pesquisa */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 O que busca em nosso site?"
          className={styles.searchInput}
        />
      </div>
    </nav>
  );
};

export default Navbar;

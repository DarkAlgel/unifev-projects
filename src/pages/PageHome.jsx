import React from "react";
import styles from "./PageHome.module.css";
import unifevLogo from "../assets/unifev.png";
import { FaUniversity, FaRocket, FaExternalLinkAlt } from "react-icons/fa"; // Importação dos ícones

const PageHome = () => {
  return (
    <div className={styles.container}>
      {/* 🏫 Logo da Unifev */}
      <img src={unifevLogo} alt="Unifev Logo" className={styles.logo} />

      <h1 className={styles.title}><FaRocket className={styles.icon} /> Repositório de Projetos</h1>
      <p className={styles.description}>
        Bem-vindo ao meu espaço de projetos de programação! Aqui você encontrará diversos trabalhos acadêmicos e experimentais 
        desenvolvidos ao longo da minha jornada como estudante de <strong>Engenharia da Computação</strong> na <strong>UNIFEV</strong>.
      </p>

      <p className={styles.description}>
        Meu nome é <strong>Luan Soares Barco</strong>, e este espaço serve como um portfólio para compartilhar ideias, algoritmos e aplicações que 
        venho desenvolvendo. Fique à vontade para explorar!
      </p>

      {/* 🔥 Seção do curso */}
      <div className={styles.courseSection}>
        <h2 className={styles.courseTitle}><FaUniversity className={styles.icon} /> Engenharia da Computação na UNIFEV</h2>
        <p className={styles.courseText}>
          Descubra como transformar código em inovação! A Engenharia da Computação na UNIFEV oferece uma abordagem moderna para criar
          tecnologias do futuro.
        </p>
        <a 
          href="https://www.unifev.edu.br/curso/10/engenharia-de-computacao" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.courseButton}
        >
          Conheça o Curso <FaExternalLinkAlt className={styles.icon} />
        </a>
      </div>
    </div>
  );
};

export default PageHome;

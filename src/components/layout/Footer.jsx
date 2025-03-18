import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.containerStyle}>
        <div className={styles.sectionStyle}>
          <h4>Sobre Nós</h4>
          <p>Na Dark Hosting, somos a principal plataforma para hospedagem de servidores, sejam eles dedicados para projetos personalizados, jogos preferidos, ou soluções empresariais. Nossa missão é fornecer desempenho de alta qualidade e flexibilidade para que você possa iniciar seu projeto ou se divertir com total liberdade. Explore nossas opções e aproveite o melhor da tecnologia com a gente!</p>
        </div>

        <div className={styles.sectionStyle}>
          <h4>Links Rápidos</h4>
          <ul className={styles.listStyle}>
            <li><a href="/" className={styles.linkStyle}>Início</a></li>
            <li><a href="/about" className={styles.linkStyle}>Sobre</a></li>
            <li><a href="/plans" className={styles.linkStyle}>Contratar Planos</a></li>
            <li><a href="/support" className={styles.linkStyle}>Suporte</a></li>
          </ul>
        </div>

        <div className={styles.sectionStyle}>
          <h4>Contato</h4>
          <p>Email: darkhostingbr@gmail.com</p>
          <p>Telefone: (17) none</p>
          <div className={styles.socialMediaStyle}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconStyle}>Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.iconStyle}>Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.iconStyle}>Twitter</a>
          </div>
        </div>
      </div>
      
      <div className={styles.copyrightStyle}>
        <p>&copy; 2025 Dark Hosting. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

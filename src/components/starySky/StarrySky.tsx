import React, { useEffect } from 'react';
import styles from './StarrySky.module.css';
import bgTree from '../../assets/images/bgTree.png'

interface StarrySkyProps {
  error?: boolean; // Ajout de la prop `error`
}

const StarrySky: React.FC<StarrySkyProps> = ({ error }) => {
  useEffect(() => {
    function init() {
      const style = ["style1", "style2", "style3", "style4"];
      const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
      const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

      function getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      let estrela = "";
      const qtdeEstrelas = 250;
      const noite = document.querySelector(`.${styles.constelacao}`);
      const widthWindow = window.innerWidth;
      const heightWindow = window.innerHeight;

      for (let i = 0; i < qtdeEstrelas; i++) {
        estrela += `<span class="${styles.estrela} ${styles[style[getRandomArbitrary(0, 4)]]} ${styles[opacity[getRandomArbitrary(0, 6)]]} ${styles[tam[getRandomArbitrary(0, 5)]]}" style="animation-delay: .${getRandomArbitrary(0, 2)}s; left: ${getRandomArbitrary(0, widthWindow)}px; top: ${getRandomArbitrary(0, heightWindow)}px;"></span>`;
      }

      if (noite) {
        noite.innerHTML = estrela;
      }

      let numeroAleatorio = 5000;

      setTimeout(() => {
        carregarMeteoro();
      }, numeroAleatorio);

      function carregarMeteoro() {
        setTimeout(carregarMeteoro, numeroAleatorio);
        numeroAleatorio = getRandomArbitrary(5000, 10000);
        const meteoro = `<div class="${styles.meteoro} ${styles[style[getRandomArbitrary(0, 4)]]}"></div>`;
        const meteoroContainer = document.querySelector(`.${styles.chuvaMeteoro}`);
        if (meteoroContainer) {
          meteoroContainer.innerHTML = meteoro;
          setTimeout(() => {
            meteoroContainer.innerHTML = "";
          }, 1000);
        }
      }
    }

    init();
  }, []);

  return (
    <div className={styles.noite}>
      <div className={styles.constelacao}></div>
      <div className={`${styles.lua} ${error ? styles.errorOpacity : ''}`}> 
        <div className={styles.textura}></div>
      </div>
      <div className={styles.chuvaMeteoro}></div>
      <div className={styles.floresta}>
        <img src={bgTree} alt="Floresta" />
      </div>
    </div>
  );
};

export default StarrySky;

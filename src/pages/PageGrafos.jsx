import { useState } from "react";
import styles from "./PageGrafos.module.css";

export default function PageGrafos() {
  const grafo = {
    1: { 2: 2 },
    2: {},
    3: { 1: 1, 2: 3 },
    4: { 1: 2, 3: 2 },
    5: { 4: 5, 6: 4, 3: 10 },
    6: { 1: 5, 4: 5 },
  };

  const [noInicial, setNoInicial] = useState(5);
  const [noFinal, setNoFinal] = useState(2);
  const [resultado, setResultado] = useState(null);

  const dijkstra = (grafo, inicio, fim) => {
    const dist = {};
    const prev = {};
    const naoVisitados = Object.keys(grafo);

    naoVisitados.forEach(no => {
      dist[no] = Infinity;
      prev[no] = null;
    });
    dist[inicio] = 0;

    while (naoVisitados.length) {
      let atual = naoVisitados.reduce((min, no) =>
        dist[no] < dist[min] ? no : min, naoVisitados[0]
      );
      if (dist[atual] === Infinity) break;
      naoVisitados.splice(naoVisitados.indexOf(atual), 1);
      if (atual == fim) break;
      Object.entries(grafo[atual]).forEach(([vizinho, custo]) => {
        const novoCusto = dist[atual] + custo;
        if (novoCusto < dist[vizinho]) {
          dist[vizinho] = novoCusto;
          prev[vizinho] = atual;
        }
      });
    }

    const caminho = [];
    for (let atual = fim; atual != null; atual = prev[atual]) {
      caminho.unshift(atual);
    }
    return dist[fim] === Infinity
      ? { distancia: Infinity, caminho: [] }
      : { distancia: dist[fim], caminho };
  };

  const calcular = () => {
    setResultado(dijkstra(grafo, noInicial, noFinal));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dijkstra Simplificado</h1>
      <div className={styles.inputGroup}>
        <label>
          Nó inicial:{" "}
          <input
            type="number"
            className={styles.input}
            value={noInicial}
            onChange={(e) => setNoInicial(Number(e.target.value))}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label>
          Nó final:{" "}
          <input
            type="number"
            className={styles.input}
            value={noFinal}
            onChange={(e) => setNoFinal(Number(e.target.value))}
          />
        </label>
      </div>
      <button className={styles.button} onClick={calcular}>
        Calcular Caminho
      </button>
      {resultado && (
        <div className={styles.result}>
          {resultado.distancia === Infinity ? (
            <p>Sem caminho de {noInicial} para {noFinal}</p>
          ) : (
            <>
              <p><strong>Distância:</strong> {resultado.distancia}</p>
              <p><strong>Caminho:</strong> {resultado.caminho.join(" -> ")}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

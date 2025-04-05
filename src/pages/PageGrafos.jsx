import { useState } from "react";
import styles from "./PageGrafos.module.css";

/**
 * Código baseado no artigo de Patrick Karsh:
 * https://patrickkarsh.medium.com/dijkstras-shortest-path-algorithm-in-javascript-1621556a3a15
 * Adaptação para React com visualização e logs adicionados para fins educacionais.
 */

export default function PageGrafos() {
  const grafo = {
    1: { 2: 12.8 , 7: 29, 8: 27.7, 9: 23.6 },
    2: { 1: 12.8, 3: 24.1, 4: 42, 7: 17, 8: 22.3},
    3: { 2: 24.1, 4: 12.8, 6: 30.8, 7: 32},
    4: { 2: 42, 3: 12.8, 5: 20 },
    5: { 4: 20, 6: 25, 14: 45, 15: 21.6 },
    6: { 3: 30.8, 5: 25, 7: 14.8, 12: 37.3, 13: 33.4, 14: 31.3 },
    7: { 1: 29, 2: 17, 3:32, 6: 14.8, 8: 24.8, 11: 32.5, 12: 33, 13: 41.3},
    8: { 1: 27.7, 2: 22.3, 7: 24.8, 9: 26.3, 10: 50, 11: 19.8},
    9: { 1: 23.6, 8: 26.3, 10: 24,},
    10:{ 8: 50, 9: 24, 11: 24, 19: 20, 20: 39.8},
    11:{ 7: 32.5, 8: 19.8, 10: 24, 12: 23, 19: 38},
    12:{ 6: 37.3, 7: 33, 11: 23, 13: 20, 17: 39, 18: 59},
    13:{ 6: 33.4, 7: 41.3, 12: 20, 14: 16, 16: 32.5, 17: 34.4},
    14:{ 5: 45, 6: 31.3, 13: 16, 15: 23.8, 16: 39},
    15:{ 5: 21.6, 14: 23.8},
    16:{ 13: 32.5, 14:39 , 17: 62, 27: 26, 28: 33},
    17:{ 12: 39, 13: 34.4, 16: 32.5, 18: 22.6, 23: 12.2},
    18:{ 12: 59, 17: 22.6, 19: 14.7, 22: 28.3, 23: 20.4},
    19:{ 10: 20, 11: 38, 18: 14.7, 20: 34, 22: 29},
    20:{ 10: 39.8, 19: 34, 21: 15.7},
    21:{ 20: 15.7},
    22:{ 18: 28.3, 19: 29, 23: 58.3},
    23:{ 17: 12.2, 18: 20.4, 22: 58.3, 24: 9.5, 26: 21},
    24:{ 23: 9.5, 25: 23.6, 26: 21},
    25:{ 24: 23.6, 28: 42},
    26:{ 23: 24.2, 24: 21},
    27:{ 16: 38, 28: 26},
    28:{ 24: 58, 25: 42, 27: 26},
  };

  const nosValidos = Object.keys(grafo).map(Number);

  const [noInicial, setNoInicial] = useState(5);
  const [noFinal, setNoFinal] = useState(2);
  const [resultado, setResultado] = useState(null);
  const [logs, setLogs] = useState([]);
  const [erro, setErro] = useState(null);

  const adicionarLog = (msg) => {
    setLogs((prev) => [...prev, msg]);
  };

  const dijkstra = (grafo, inicio, fim) => {
    const dist = {};
    const prev = {};
    const naoVisitados = Object.keys(grafo);

    setLogs([]);
    adicionarLog("Iniciando algoritmo de Dijkstra");

    naoVisitados.forEach((no) => {
      dist[no] = Infinity;
      prev[no] = null;
    });
    dist[inicio] = 0;

    adicionarLog(`Nó inicial: ${inicio}`);
    adicionarLog(`Nó final: ${fim}`);

    while (naoVisitados.length) {
      let atual = naoVisitados.reduce((min, no) =>
        dist[no] < dist[min] ? no : min, naoVisitados[0]
      );

      adicionarLog(`Visitando nó: ${atual} (distância atual: ${dist[atual]})`);

      if (dist[atual] === Infinity) {
        adicionarLog("Caminho inacessível a partir deste nó.");
        break;
      }

      naoVisitados.splice(naoVisitados.indexOf(atual), 1);
      if (atual == fim) {
        adicionarLog("Nó final alcançado.");
        break;
      }

      Object.entries(grafo[atual]).forEach(([vizinho, custo]) => {
        const novoCusto = dist[atual] + custo;
        if (novoCusto < dist[vizinho]) {
          dist[vizinho] = novoCusto;
          prev[vizinho] = atual;
          adicionarLog(`Atualizado: ${vizinho} via ${atual} (novo custo: ${novoCusto})`);
        } else {
          adicionarLog(`Mantido: ${vizinho} já tem um caminho melhor.`);
        }
      });
    }

    const caminho = [];
    for (let atual = fim; atual != null; atual = prev[atual]) {
      caminho.unshift(atual);
    }

    if (dist[fim] === Infinity) {
      adicionarLog("Nenhum caminho encontrado.");
    } else {
      adicionarLog(`Caminho encontrado: ${caminho.join(" -> ")}`);
      adicionarLog(`Distância total: ${dist[fim]}`);
    }

    return dist[fim] === Infinity
      ? { distancia: Infinity, caminho: [] }
      : { distancia: dist[fim], caminho };
  };

  const calcular = () => {
    setResultado(null);
    setLogs([]);
    setErro(null);

    if (noInicial < 0 || noFinal < 0) {
      setErro("Números negativos não são permitidos.");
      return;
    }
    if (!nosValidos.includes(noInicial)) {
      setErro(`O nó inicial (${noInicial}) não existe no grafo.`);
      return;
    }
    if (!nosValidos.includes(noFinal)) {
      setErro(`O nó final (${noFinal}) não existe no grafo.`);
      return;
    }

    const res = dijkstra(grafo, noInicial, noFinal);
    setResultado(res);
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

      {erro && (
        <div className={styles["result-error"]}>
          {erro}
        </div>
      )}


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

      {logs.length > 0 && (
        <div className={styles.logs}>
          <h2>Log do Algoritmo</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index} style={{ fontFamily: 'monospace', marginBottom: '4px' }}>{log}</li>
            ))}
          </ul>
        </div>
      )}

      <footer className={styles.footer}>
        <p>
          Baseado no algoritmo de Dijkstra adaptado de{" "}
          <a
            href="https://patrickkarsh.medium.com/dijkstras-shortest-path-algorithm-in-javascript-1621556a3a15"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patrick Karsh
          </a>
          .
        </p>
      </footer>

    </div>
  );
}

import { useState } from "react";
import styles from "./PageGrafos.module.css";

/**
 * Código baseado no artigo de Patrick Karsh:
 * https://patrickkarsh.medium.com/dijkstras-shortest-path-algorithm-in-javascript-1621556a3a15
 * Adaptação para React com visualização e logs adicionados para fins educacionais.
 */

export default function PageGrafos() {
  const grafo = {
    1: { 2: 2 },
    2: {},
    3: { 1: 1, 2: 3 },
    4: { 1: 2, 3: 2 },
    5: { 4: 5, 6: 4, 3: 10 },
    6: { 1: 5, 4: 5 },
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

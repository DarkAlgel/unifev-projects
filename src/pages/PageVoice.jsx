import React, { useState } from "react";
import styles from "./PageVoice.module.css";
import { FaMicrophone, FaVolumeUp, FaRobot } from "react-icons/fa";

const PageVoice = () => {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState(null); // comando reconhecido (ligar/desligar/etc)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setText(transcript);
      setListening(false);

      // divide por palavras para evitar confusão com "desligar" incluindo "ligar"
      const palavras = transcript.split(/\s+/);

      if (palavras.includes("desligar")) {
        setCommand("desligar");
      } else if (palavras.includes("ligar")) {
        setCommand("ligar");
      } else {
        setCommand("comando não reconhecido");
      }
    };

    recognition.onerror = (err) => {
      console.error("Erro:", err);
      alert("Erro ao reconhecer voz.");
      setListening(false);
    };
  };

  const fecharModal = () => setCommand(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><FaRobot className={styles.icon} /> Reconhecimento de Voz</h1>
      <p className={styles.description}>
        Pressione o botão abaixo e diga um comando como <strong>"ligar"</strong> ou <strong>"desligar"</strong>.
      </p>
      <button
        onClick={startListening}
        disabled={listening}
        className={styles.listenButton}
      >
        {listening ? <FaVolumeUp /> : <FaMicrophone />} {listening ? "Ouvindo..." : "Falar"}
      </button>
      <p className={styles.result}>
        Texto reconhecido: <strong>{text || "Nenhum"}</strong>
      </p>

      {/* Modal simples */}
      {command && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>
              {command === "ligar" && "🟢 Comando reconhecido: Ligar"}
              {command === "desligar" && "🔴 Comando reconhecido: Desligar"}
              {command === "comando não reconhecido" && "⚠️ Comando não reconhecido."}
            </p>
            <button onClick={fecharModal} className={styles.modalCloseButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageVoice;

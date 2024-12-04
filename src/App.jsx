import React, { useState } from 'react';
import './App.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [erro, setErro] = useState('');

  const validarEntrada = () => {
    if (!altura || !peso) {
      setErro('Preencha ambos os campos.');
      return false;
    }
    if (altura <= 0 || peso <= 0) {
      setErro('Digite valores maiores que zero.');
      return false;
    }
    setErro('');
    return true;
  };

  const calcularIMC = () => {
    if (validarEntrada()) {
      const alturaMetros = parseFloat(altura) / 100;
      const resultadoIMC = (peso / (alturaMetros ** 2)).toFixed(2);
      setImc(resultadoIMC);
      setClassificacao(classificarIMC(resultadoIMC));
    }
  };

  const reiniciarFormulario = () => {
    setAltura('');
    setPeso('');
    setImc(null);
    setClassificacao('');
    setErro('');
  };

  const classificarIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    if (imc < 34.9) return 'Obesidade Grau 1';
    if (imc < 39.9) return 'Obesidade Grau 2';
    return 'Obesidade Grau 3';
  };

  return (
    <div className="App">
      <h1>Calculadora de IMC</h1>
      <div>
        <label>Altura (cm):</label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Digite sua altura"
        />
      </div>
      <div>
        <label>Peso (kg):</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Digite seu peso"
        />
      </div>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button onClick={calcularIMC}>Calcular IMC</button>
      <button onClick={reiniciarFormulario} style={{ marginLeft: '10px' }}>
        Reiniciar
      </button>
      {imc && (
        <div>
          <h2>Seu IMC: {imc}</h2>
          <p>Classificação: {classificacao}</p>
        </div>
      )}
    </div>
  );
}

export default App;


import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function MainPage() {
    const [response, setResponse] = useState("");

    function startProcess() {
        const name = prompt("Insira o nome do candidato");
        const body = {
            name,
        }
        const promise = axios.post("http://localhost:8080/api/v1/hiring/start", body)
        promise.then((res) => console.log(res));
        promise.catch((err) => console.log(err));
    }

  return (
    <Container>
      <Title>Sistema de RH - Controle de Candidatos</Title>
      <Box>
        <BoxButton>
          <button onClick={() => startProcess()}>Registrar candidato</button>
          <button>Marcar entrevista</button>
          <button>Desqualificar candidato</button>
          <button>Aprovar candidato</button>
          <button>Verificar status</button>
          <button>Exibir candidatos aprovados</button>
        </BoxButton>
        <h2>
          Selecione ou <span>registre</span> um candidato:
        </h2>
        <BoxCandidates>

        </BoxCandidates>
        <h2>Resposta:</h2>
        <BoxResponse>
            <h3>{response}</h3>
        </BoxResponse>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f2f7ff;
  width: 100vw;
  min-height: 100vh;
  font-family: "Raleway", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  background-color: #10316b;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.20);
  width: 100vw;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: xx-large;
  text-align: center;
  color: #f2f7ff;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
`;
const Box = styled.div`
  width: 80vw;

  span {
    text-decoration: underline;
    cursor: pointer;
  }

  h2 {
    font-size: large;
    color: #10316b;
    margin-top: 40px;
  }
`;
const BoxCandidates = styled.div`
  width: 98%;
  height: auto;
  min-height: 30vh;
  background-color: white;
  border: solid 1px #10316b;
  border-radius: 0px 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.20);
  padding: 10px;
  margin: 20px 0px;
`;

const BoxButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 150px;

  button {
    background-color: #0b409c;
    height: 60px;
    width: 200px;
    margin: 5px;
    border: solid 1px #0b409c;
    border-radius: 0px 8px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.20);

    font-family: "Raleway", sans-serif;
    font-size: medium;
    color: white;

    cursor: pointer;
  }
`;
const BoxResponse = styled.div`
  width: 98%;
  height: auto;
  min-height: 10vh;
  background-color: white;
  border: solid 1px #10316b;
  border-radius: 0px 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.20);
  padding: 10px;
  margin: 20px 0px;
`;

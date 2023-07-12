import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function MainPage() {
  const [response, setResponse] = useState("");
  const [idSelected, setIdSelected] = useState(0);
  const [candidates, setCandidates] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/hiring/allcandidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.log(err));
  }, []);

  function startProcess() {
    const name = prompt("Insira o nome do candidato");
    const body = {
      name,
    };
    axios
      .post("http://localhost:8080/api/v1/hiring/start", body)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));

      setTimeout(() => {
        window.location.reload();
      }, 3000);
  }

  function scheduleInterview() {
    if (idSelected === 0) {
      alert ("Selecione um candidato");
      return;
    }
    const body = {
      id: idSelected,
    };
    axios
      .post("http://localhost:8080/api/v1/hiring/schedule", body)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  }

  function disqualifyCandidate() {
    if (idSelected === 0) {
      alert ("Selecione um candidato");
      return;
    }
    const body = {
      id: idSelected,
    };
    axios
      .post("http://localhost:8080/api/v1/hiring/disqualify", body)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  }

  function approveCandidate() {
    if (idSelected === 0) {
      alert ("Selecione um candidato");
      return;
    }
    const body = {
      id: idSelected,
    };
    axios
      .post("http://localhost:8080/api/v1/hiring/approve", body)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  }

  function getStatus() {
    if (idSelected === 0) {
      alert ("Selecione um candidato");
      return;
    }
    axios
      .get(`http://localhost:8080/api/v1/hiring/candidate/${idSelected}`)
      .then((res) => setResponse(res.data))
      .catch((err) => console.log(err));
  }

  function getApproved() {
    axios
      .get(`http://localhost:8080/api/v1/hiring/approved`)
      .then((res) => {
        if (res.data.length > 0) {
          setResponse(res.data.map((c) => <h3 key={c.id}>{c.name}</h3>))
        } else {
          setResponse("Não há candidatos aprovados")
        }        
      })
      .catch((err) => console.log(err));
  }

  if (candidates === null) return;

  return (
    <Container>
      <Title>Sistema de RH - Controle de Candidatos</Title>
      <Box>
        <BoxButton>
          <button onClick={() => startProcess()}>Registrar candidato</button>
          <button onClick={scheduleInterview}>Marcar entrevista</button>
          <button onClick={disqualifyCandidate}>Desqualificar candidato</button>
          <button onClick={approveCandidate}>Aprovar candidato</button>
          <button onClick={getStatus}>Verificar status</button>
          <button onClick={getApproved}>Exibir candidatos aprovados</button>
        </BoxButton>
        <h2>
          Selecione ou <span onClick={() => startProcess()}>registre</span> um novo candidato:
        </h2>
        <BoxCandidates>
        {candidates.map((c) => (
          <div
            key={c.id}
            style={{borderRadius: "0px 12px", backgroundColor: c.id === idSelected ? "#ffe867" : "" }}
            onClick={() => setIdSelected(c.id)}
          >
            <h3>{c.id}</h3>
            <h3>{c.name}</h3>
          </div>
        ))}
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

  img {
    width: 60px;
    margin-top: 500px;
  }
`;
const Title = styled.div`
  background-color: #10316b;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
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
  border-radius: 0px 12px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2); 
  margin: 20px 0px;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  h3 {
    margin: 12px;
  }
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
    border-radius: 0px 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

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
  border-radius: 0px 12px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  margin: 20px 0px;
  text-align: center;

  h3 {
    margin: 12px;
  }
`;

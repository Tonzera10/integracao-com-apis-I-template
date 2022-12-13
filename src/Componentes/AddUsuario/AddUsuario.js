import axios from "axios";
import React, { useEffect, useState } from "react";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const criarUsuario=(name,email) => {
    const headers = {
      headers: {
        Authorization: "everton-mello-barbosa"
      }
    }

    const body = {
      name,
      email
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, headers)
    .then((resposta)=> {
      alert("Usuario adiacionado com sucesso!");
      setNome("")
      setEmail("")
      props.pegarUsuarios()
    })
    .catch((erro) => {
      alert(erro);
    })
  }

  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={() => criarUsuario(nome, email)}>Enviar</button>
    </>
  );
}

export default AddUsuario;

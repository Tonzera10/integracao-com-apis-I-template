import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const headers = {
    headers: {
      Authorization: "everton-mello-barbosa"
    } 
  };

  const deletarUsuario = () => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`,headers)
    .then((resposta)=>{
      alert("Usuario deletado com sucesso!")
      props.pegarUsuarios()
    })
    .catch((erro)=>{
      alert(erro);
    })
  }

  const editarUsuario = (name, email) => {
    const body = {
      name,
      email
    };
    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, body, headers)
    .then((resposta)=>{
      alert("Editado com sucesso!")
      setNome("")
      setEmail("")
      setEditar(!editar);
      props.pegarUsuarios()
    })
    .catch((erro)=>{
      alert(erro);
    })
  }

  const pegarUsuarioPeloId = () => {

    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, headers)
    .then((resposta)=>{
      setEmail(resposta.data.email)
    })
    .catch((erro)=>{
      console.log(erro);
    })
  }

  useEffect(()=>{
    pegarUsuarioPeloId()

  }, [])

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => editarUsuario(nome, email)}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={deletarUsuario}>Excluir</button>
    </User>
  );
}

export default Usuario;

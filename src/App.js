import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios"

function App() {
  const [usuarios, setUsuarios] = useState([]);

  const headers = {
    headers: {
      Authorization: "everton-mello-barbosa"
    }
  } 

  const pegarUsuarios = ()=> {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", headers)
    .then((resposta)=> {
      setUsuarios(resposta.data);
    })
    .catch((erro)=> {
      alert(erro);
    })
  }

  useEffect(() => {
    pegarUsuarios()

  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario pegarUsuarios={pegarUsuarios}/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} id={usuario.id} pegarUsuarios={pegarUsuarios}/>
      })}
    </>
  )
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, Table, Titulo, ButtonPrimary, ButtonWarning, ButtonDanger, AlertSuccess, AlertDanger } from '../styles.css';


export const Cadastrar = () => {

  const [pessoa, setPessoa] = useState({
    titulo: '',
    descricao: ''
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const cadaPessoa = async e => {
    e.preventDefault();
    //console.log(pessoa.titulo);

    await fetch("http://localhost/3000/cadastrar.js", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pessoa })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Pessoa não cadastrada, tente novamente!'
        });
      });
  }

  return (
    <div className="Container">
      <div className="ConteudoForm">
        <div classNameName='ConteudoTitulo'>
          <div className="Titulo">Cadastrar</div>
          <div className="BotaoAcao">
            <Link to="/">
              <div className="ButtonInfo">Listar</div>
            </Link>
          </div>
        </div>

        {status.type === 'erro' ? <div className="AlertDanger">{status.mensagem}</div> : ""}
        {status.type === 'success' ? <div className="AlertSuccess">{status.mensagem}</div> : ""}

        <div className="Form" onSubmit={cadaPessoa}>
          <h1>Descrição: </h1>
          <h1>Informações da pessoa</h1>

          <div className="ButtonSuccess" type="submit">Cadastrar</div>

        </div>
      </div>
    </div>
  );
}

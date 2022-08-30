import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, Table, Titulo, ButtonPrimary, ButtonWarning, ButtonDanger, AlertSuccess, AlertDanger } from '../styles.css';

export const Home = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const getPessoas = async () => {
    fetch("http://localhost/3000/home.js")
      .then((response) => response.json())
      .then((responseJson) => (
        //console.log(responseJson),
        setData(responseJson.records)
      ));
  }

  const apagarPessoa = async (idPessoa) => {
    //console.log(idPessoa);
    await fetch("http://localhost/3000/home.js" + idPessoa)
      .then((response) => response.json())
      .then((responseJson) => {
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
          getPessoas();
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: "Erro: Pessoa não apagado, tente novamente!"
        });
      });
  };

  useEffect(() => {
    getPessoas();
  }, [])

  return (
    <div className='Container'>
      <div className='ConteudoTitulo'>
        <div className='Titulo'>Listar</div>
        <div className='BotaoAcao'>
          <Link to="/cadastrar">
            <div className='ButtonSuccess'>Cadastrar</div>
          </Link>
        </div>
      </div>

      {status.type === 'erro' ? <div className='AlertDanger'>{status.mensagem}</div> : ""}
      {status.type === 'success' ? <div className='AlertSuccess'>{status.mensagem}</div> : ""}

      <div className='Table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(pessoa => (
            <tr key={pessoa.id}>
              <td>{pessoa.id}</td>
              <td>{pessoa.titulo}</td>
              <td>{pessoa.descricao}</td>
              <td>
                <Link to={"/visualizar/" + pessoa.id}>
                  <div className='ButtonPrimary'>Visualizar</div>
                </Link>{" "}
                <Link to={"/editar/" + pessoa.id}>
                  <div className='ButtonWarning'>Editar</div>
                </Link>{" "}
                <div className='ButtonDanger' onClick={() => apagarPessoa(pessoa.id)}>Apagar</div>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
}

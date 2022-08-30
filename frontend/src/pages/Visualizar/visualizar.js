import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, Table, Titulo, ButtonPrimary, ButtonWarning, ButtonDanger, AlertSuccess, AlertDanger } from '../styles.css';

export const Visualizar = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    useEffect(() => {
        const getPessoa = async () => {
            await fetch('http://localhost/3000/visualizar')
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    setData(responseJson.pessoa);
                });
        }
        getPessoa();
    }, [id]);
    return (
        <div classNameName='Container'>
            < div classNameName='ConteudoTitulo'>
                <div className='Titulo'>Visualizar</div>
                < div className='BotaoAcao'>
                    <Link to='/'>
                        <div className='ButtonInfo'>Listar</div>
                    </Link>
                </div>
            </div>
            <div className='ConteudoPessoa'>ID: {data.id}</div>
            <div className='ConteudoPessoa'>Título: {data.titulo}</div>
            <div className='ConteudoPessoa'>Descrição: {data.descricao}</div>
        </div>
    );
}
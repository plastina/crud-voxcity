import { Component } from 'react';

export class Usuarios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: '',
      senha: '',
      CPF: '',
    };

    this.buscarUsuarios = this.buscarUsuarios.bind(this);
    this.inserirUsuario = this.inserirUsuario.bind(this);
    this.atualizarUsuario = this.atualizarUsuario.bind(this);
    this.excluirUsuario = this.excluirUsuario.bind(this);

    this.atualizaNome = this.atualizaNome.bind(this);
    this.atualizaSenha = this.atualizaSenha.bind(this);
    this.atualizaCPF = this.atualizaCPF.bind(this);
  }

  componentDidMount() {
    this.buscarUsuarios();
  }

  // GET (todos usuarios)
  buscarUsuarios() {
    fetch('https://localhost:44362/api/usuarios/')
      .then(response => response.json())
      .then(data => this.setState({ usuarios: data }));
  }

  //GET (usuario com determinado id)
  buscarUsuario(id) {
    fetch('https://localhost:44362/api/usuarios/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Usuarios)
    })
      .then(response => response.json())
      .then(data => this.setState(
        {
          id: data.id,
          nome: data.nome,
          senha: data.senha,
          cpf: data.cpf
        }));
  }

  inserirUsuario = (usuario) => {
    fetch('https://localhost:44362/api/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    }).then((resposta) => {

      if (resposta.ok) {
        this.buscarUsuarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    }).catch(console.log);
  }

  atualizarUsuario(usuario) {
    fetch('https://localhost:44362/api/usuarios/' + usuario.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarUsuarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  excluirUsuario = (id) => {
    fetch('https://localhost:44362/api/usuarios/' + id, {
      method: 'DELETE',
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarUsuarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  atualizaNome(nome) {
    this.setState({
      nome: nome.target.value
    });
  }

  atualizaSenha(senha) {
    this.setState({
      senha: senha.target.value
    });
  }

  atualizaCPF(cpf) {
    this.setState({
      cpf: cpf.target.value
    });
  }

  submit = () => {
    const usuario = {
      id: this.state.id,
      nome: this.state.nome,
      senha: this.state.senha,
      CPF: this.state.CPF
    };

    if (this.state.id === 0) {
      this.inserirUsuario(usuario);
    } else {
      this.atualizarUsuarioo(usuario);
    }
  }
}
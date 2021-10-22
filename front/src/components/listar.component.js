import React, { Component } from "react";
import LivroDataService from "../services/livro.service";
import { Link } from "react-router-dom";

export default class LivrariaList extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchTitulo = this.onChangeSearchTitulo.bind(this);
        this.retrieveLivros = this.retrieveLivros.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveLivros = this.setActiveLivros.bind(this);
        this.removeAllLivros = this.removeAllLivros.bind(this);
        this.searchTitulo = this.searchTitulo.bind(this);

        this.state = {
            livros: [],
            atual: null,
            indice: -1,
            pesquisa: ""
        }
    };

    componentDidMount(){
        this.retrieveLivros();
    }

    onChangeSearchTitulo(e) {
        const pesquisa = e.target.value;

        this.setState({
            pesquisa: pesquisa
        });
    }

    retrieveLivros(){
        LivroDataService.getAll()
            .then(response => {
                this.setState({
                    livros: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList(){
        this.retrieveLivros();
        this.setState({
            atual: null,
            indice: -1
        })
    }

    setActiveLivros(livro, indice){
        this.setState({
            atual: livro,
            indice: indice
        })
    }

    removeAllLivros(){
        LivroDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        })
    }

    searchTitulo(){
        LivroDataService.findByTitulo(this.state.pesquisa)
            .then(response => {
                this.setState({
                    livros: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            });
    }

    render(){
        const { pesquisa, livros, atual, indice } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisa por titulo"
                            value={pesquisa}
                            onChange={this.onChangeSearchTitulo}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitulo}
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Livros</h4>
                    <ul className="list-group">
                        {livros && livros.map((livro, index) => (
                            <li
                                className={
                                    "list-group-item " + 
                                    (index === indice ? "active" : "")
                                }
                                onClick={() => this.setActiveLivros(livro, index)}
                                key={index}
                            >
                                {livro.titulo}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllLivros}
                    >
                        Apagar tudo
                    </button>

                </div>
                <div className="col-md-6">
                    {atual ? (
                        <div>
                            <h4>Livro</h4>
                            <div>
                                <label>
                                    <strong>Titulo</strong>
                                </label>{" "}
                                {atual.titulo}
                            </div>
                            <div>
                                <label>
                                    <strong>Descricao</strong>
                                </label>{" "}
                                {atual.descricao}
                            </div>
                            <div>
                                <label>
                                    <strong>Publicado?</strong>
                                </label>{" "}
                                {atual.publicado ? "Publicado" : "Pendente"}
                            </div>

                            <Link
                                to={"/livraria/"+atual.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ):(
                        <div>
                            <br/>
                            <p>Insire um livro</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
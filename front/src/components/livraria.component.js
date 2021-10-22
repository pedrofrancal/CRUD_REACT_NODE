import React, { Component } from "react";
import LivroDataService from "../services/livro.service";

export default class Livraria extends Component{
    constructor(props){
        super(props);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.getLivro = this.getLivro.bind(this);
        this.updatePublicado = this.updatePublicado.bind(this);
        this.updateLivro = this.updateLivro.bind(this);
        this.deleteLivro = this.deleteLivro.bind(this);

        this.state = {
            atual: {
                id: null,
                titulo: "",
                descricao: "",
                publicado: false
            },
            message: ""
        };
    }

    componentDidMount(){
        this.getLivro(this.props.match.params.id);
    }

    onChangeTitulo(e){
        const titulo = e.target.value;

        this.setState(function(prevState){
            return {
                atual: {
                    ...prevState.atual,
                    titulo: titulo
                }
            };
        });
    }

    onChangeDescricao(e) {
        const descricao = e.target.value;

        this.setState(prevState => ({
            atual: {
                ...prevState.atual,
                descricao: descricao
            }
        }));
    }

    getLivro(id) {
        LivroDataService.get(id)
            .then(response => {
                this.setState({
                    atual: response.data
                });
                console.lolg(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublicado(status){
        var data = {
            id: this.state.atual.id,
            titulo: this.state.atual.titulo,
            descricao: this.state.atual.descricao,
            publicado: status
        };

        LivroDataService.update(this.state.atual.id, data)
            .then(response => {
                this.setState(prevState => ({
                    atual: {
                        ...prevState.atual,
                        publicado: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateLivro(){
        LivroDataService.update(
            this.state.atual.id,
            this.state.atual
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "Update com sucessp!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteLivro(){
        LivroDataService.delete(this.state.atual.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/livraria')
            })
            .catch(e => {
                console.log(e);
            })
    }

    render(){
        const { atual } = this.state;

        return (
        <div>
            {atual ? (
            <div className="edit-form">
                <h4>Livro</h4>
                <form>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={atual.titulo}
                    onChange={this.onChangeTitulo}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descricao</label>
                    <input
                    type="text"
                    className="form-control"
                    id="descricao"
                    value={atual.descricao}
                    onChange={this.onChangeDescricao}
                    />
                </div>

                <div className="form-group">
                    <label>
                    <strong>Estado:</strong>
                    </label>
                    {atual.publicado ? "Publicado" : "Pendente"}
                </div>
                </form>

                {atual.publicado ? (
                <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublicado(false)}
                >
                    Despublicar
                </button>
                ) : (
                <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublicado(true)}
                >
                    Publicado
                </button>
                )}

                <button
                className="badge badge-danger mr-2"
                onClick={this.deleteLivro}
                >
                Deletar
                </button>

                <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateLivro}
                >
                Atualizar
                </button>
                <p>{this.state.message}</p>
            </div>
            ) : (
            <div>
                <br />
                <p>Clique em um livro</p>
            </div>
            )}
        </div>
        );
    }
}
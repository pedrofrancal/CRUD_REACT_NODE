import React, { Component } from "react";
import LivroDataService from "../services/livro.service";

export default class AddLivro extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.saveLivro = this.saveLivro.bind(this);
        this.novoLivro = this.novoLivro.bind(this);

        this.state = {
            id: null,
            titulo: "",
            descricao: "",
            publicado: false,
            enviado: false
        };
    }

    onChangeTitulo(e){
        this.setState({
            titulo: e.target.value
        })
    }

    onChangeDescricao(e){
        this.setState({
            descricao: e.target.value
        })
    }

    saveLivro(){
        var data = {
            titulo: this.state.titulo,
            descricao: this.state.descricao
        };

        LivroDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    titulo: response.data.titulo,
                    descricao: response.data.descricao,
                    publicado: response.data.publicado,

                    enviado: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    novoLivro(){
        this.setState({
            id: null,
            titulo: "",
            descricao: "",
            publicado: false,

            enviado: false
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.enviado ? (
                    <div>
                        <h4>Enviado com sucesso</h4>
                        <button className="btn btn-success" onClick={this.novoLivro}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                required
                                value={this.state.titulo}
                                onChange={this.onChangeTitulo}
                                name="titulo"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao">Descricao</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.descricao}
                                onChange={this.onChangeDescricao}
                                name="descricao"
                            />
                        </div>
                        <button onClick={this.saveLivro} className="btn btn-success">
                            Enviar
                        </button>
                    </div>
                )}
            </div>
        )
    }
}
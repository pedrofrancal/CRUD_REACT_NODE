import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import addLivro from "./components/add-livro.component";
import Livraria from "./components/livraria.component";
import LivrariaList from "./components/listar.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expanded-lg navbar-dark bg-dark">
                    <a href="/livraria" className="navbar-brand">Livraria</a>
                    <div className="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link to={"/livraria"} className="nav-link">
                                Livraria
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to={"/adicionar"} className="nav-link">
                                Adicionar
                            </Link>
                        </li>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/livraria"]} component={LivrariaList}/>
                        <Route exact path="/adicionar" component={addLivro}/>
                        <Route path="/livraria/:id" component={Livraria}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
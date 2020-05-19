import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduit from "./components/add-produit.component";
import Produit from "./components/produit.component";
import ProduitsList from "./components/produits-list.component";
import Boutique from "./components/boutique.component";
import Statistique from "./components/statistique.component";
import Notifications from "./components/notification.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/produits" className="navbar-brand">
              my Lantadeli
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/produits"} className="nav-link">
                  Produits
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>

              {/*todo : ajout d'une item boutique pour la carte*/}
              <li className="nav-item">
                <Link to={"/boutique"} className="nav-link">
                  boutique
                </Link>
              </li>

              {/*todo : ajout d'une item statistique de vente*/}
              <li className="nav-item">
                <Link to={"/statistique"} className="nav-link">
                  statistique
                </Link>
              </li>
            </div>
          </nav>
          <Notifications/>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/produits"]} component={ProduitsList} />
              <Route exact path="/add" component={AddProduit} />
              <Route exact path="/boutique" component={Boutique} />
              <Route exact path="/statistique" component={Statistique} />
              <Route path="/produits/:id" component={Produit} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

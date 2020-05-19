import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";
import { Link } from "react-router-dom";

export default class Statistique extends Component {

    //todo : créer une ou plusieur courbe de statistique :
    //      - vente en fonction des produits de zone
    //      - par matière / par composant
    constructor(props) {
        super(props);
        this.onChangeSearchReference = this.onChangeSearchReference.bind(this);
        this.retrieveProduits = this.retrieveProduits.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduit = this.setActiveProduit.bind(this);
        this.removeAllProduits = this.removeAllProduits.bind(this);
        this.searchReference = this.searchReference.bind(this);

        this.state = {
            Produits: [],
            currentProduit: null,
            currentIndex: -1,
            searchReference: ""
        };
    }

    componentDidMount() {
        this.retrieveProduits();
    }

    onChangeSearchReference(e) {
        const searchReference = e.target.value;

        this.setState({
            searchReference: searchReference
        });
    }

    retrieveProduits() {
        ProduitDataService.getAll()
            .then(response => {
                this.setState({
                    Produits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveProduits();
        this.setState({
            currentProduit: null,
            currentIndex: -1
        });
    }

    setActiveProduit(Produit, index) {
        this.setState({
            currentProduit: Produit,
            currentIndex: index
        });
    }

    removeAllProduits() {
        ProduitDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchReference() {
        ProduitDataService.findByReference(this.state.searchReference)
            .then(response => {
                this.setState({
                    Produits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchReference, Produits, currentProduit, currentIndex } = this.state;

        return (
            <div className="list row">
                {/*production en cours*/}
                {/*<div className="col-md-8">*/}
                {/*    <div className="input-group mb-3">*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            className="form-control"*/}
                {/*            placeholder="Search by reference"*/}
                {/*            value={searchReference}*/}
                {/*            onChange={this.onChangeSearchReference}*/}
                {/*        />*/}
                {/*        <div className="input-group-append">*/}
                {/*            <button*/}
                {/*                className="btn btn-outline-secondary"*/}
                {/*                type="button"*/}
                {/*                onClick={this.searchReference}*/}
                {/*            >*/}
                {/*                Search*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-md-6">*/}
                {/*    <h4>Liste des Produits </h4>*/}
                {/*    /!*todo : ranger par référence *!/*/}

                {/*    <ul className="list-group">*/}
                {/*        {Produits &&*/}
                {/*        Produits.map((Produit, index) => (*/}
                {/*            <li*/}
                {/*                className={*/}
                {/*                    "list-group-item " +*/}
                {/*                    (index === currentIndex ? "active" : "")*/}
                {/*                }*/}
                {/*                onClick={() => this.setActiveProduit(Produit, index)}*/}
                {/*                key={index}*/}
                {/*            >*/}
                {/*                {Produit.reference}*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}

                {/*    <button*/}
                {/*        className="m-3 btn btn-sm btn-danger"*/}
                {/*        onClick={this.removeAllProduits}*/}
                {/*    >*/}
                {/*        Remove All*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*<div className="col-md-6">*/}
                {/*    {currentProduit ? (*/}
                {/*        <div>*/}
                {/*            <h4>Produit</h4>*/}
                {/*            <div>*/}
                {/*                <label>*/}
                {/*                    <strong>Reference:</strong>*/}
                {/*                </label>{" "}*/}
                {/*                {currentProduit.reference}*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <label>*/}
                {/*                    <strong>Couleur:</strong>*/}
                {/*                </label>{" "}*/}
                {/*                {currentProduit.couleur}*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <label>*/}
                {/*                    <strong>Prix conseillé:</strong>*/}
                {/*                </label>{" "}*/}
                {/*                {currentProduit.prixConseiller}*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <label>*/}
                {/*                    <strong>Quantité total:</strong>*/}
                {/*                </label>{" "}*/}
                {/*                {currentProduit.quantite_total}*/}
                {/*            </div>*/}

                {/*            <Link*/}
                {/*                to={"/produits/" + currentProduit.id}*/}
                {/*                className="badge badge-warning"*/}
                {/*            >*/}
                {/*                Edit*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*    ) : (*/}
                {/*        <div>*/}
                {/*            <br />*/}
                {/*            <p>Please click on a Produit...</p>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        );
    }
}

import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Boutique extends Component {

    //todo : créer une carte de la boutique (simplifier, entrée, vitrine est/sud nord, pied d'estale central  )
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
        const { zoneExposition, Produits, currentProduit, currentIndex } = this.state;

        return (
            <div className="list row">
                {/* Barre de recherche */}
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Reference"
                            value={zoneExposition}
                            onChange={this.onChangeSearchReference}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchReference}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                {/*information début */}
                <div className="informationProduit">
                    {currentProduit ? (
                        <div>
                            <h4>Produit</h4>
                            <div>
                                <label>
                                    <strong>Reference:</strong>
                                </label>{" "}
                                {currentProduit.reference}
                            </div>
                            <div>
                                <label>
                                    <strong>Zone d'exposition:</strong>
                                </label>{" "}
                                {currentProduit.zoneExposition}
                            </div>
                            <div>
                                <label>
                                    <strong>Prix conseillé:</strong>
                                </label>{" "}
                                {currentProduit.prixConseiller}
                            </div>
                            <div>
                                <label>
                                    <strong>Quantité total:</strong>
                                </label>{" "}
                                {currentProduit.quantite_total}
                            </div>

                            <Link
                                to={"/produits/" + currentProduit.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Produit...</p>
                        </div>
                    )}
                </div>
                {/*information fin*/}
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <h4>Zone 1</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    1 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                        <Col xs={6} md={4}>
                            <h4>Zone 2</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    2 == Produit.zoneExposition ?
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveProduit(Produit, index)}
                                            key={index}
                                        >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                        </li>: null
                                ))}
                            </ul>
                        </Col>
                    </Row>

                    {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                    <Row>
                        <Col xs={6} md={4}>
                            <h4>Zone 3</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    3 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                        <Col xs={6} md={4}>
                            <h4>Zone 4</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    4 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                        <Col xs={6} md={4}>
                            <h4>Zone 5</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    5 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                    </Row>

                    {/* Columns are always 50% wide, on mobile and desktop */}
                    <Row>
                        <Col xs={6}>
                            <h4>Zone 6</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    6 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                        <Col xs={6}>
                            <h4>Zone 7</h4>
                            <ul className="list-group">
                                {Produits &&
                                Produits.map((Produit, index) => (
                                    7 == Produit.zoneExposition ?
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduit(Produit, index)}
                                        key={index}
                                    >
                                        <span className="alignReferenceBoutique">
                                            <b>{Produit.reference}</b>
                                            <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                                         </span>
                                    </li>: null
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Container>

            </div>

    );
    }
}

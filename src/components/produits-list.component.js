import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";
import { Link } from "react-router-dom";

export default class ProduitsList extends Component {
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
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by reference"
              value={searchReference}
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
        <div className="col-md-6">
          <h4>Liste des Produits </h4>
{/*todo : notification par quantité en dessous de 10 pièces*/}
          <ul className="list-group">
            {Produits &&
            Produits.map((Produit, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduit(Produit, index)}
                  key={index}
                >
                  <span className="alignReference">
                    <b>{Produit.reference}</b>
                    <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1">{parseInt(Produit.stockBoutique) < 11? "⚠" + Produit.stockBoutique : null}</span>
                  </span>
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
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
                  <strong>StockBoutique:</strong>
                </label>{" "}
                {currentProduit.stockBoutique}
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
      </div>
    );
  }
}

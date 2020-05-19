import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class AddProduit extends Component {
  constructor(props) {
    super(props);

    this.onChangeReference = this.onChangeReference.bind(this);
    this.onChangePrixConseiller = this.onChangePrixConseiller.bind(this);
    this.onChangeQuantite_total = this.onChangeQuantite_total.bind(this);
    this.onChangeZoneExposition = this.onChangeZoneExposition.bind(this);
    this.onChangeStockBoutique = this.onChangeStockBoutique.bind(this);

    // todo : ajout des différentes information de produit
    //    [carte de la boutique]
    //      - zoneExposition
    //      - dateExposer
    //      - dateRetirerExposition ( en visager )
    //      - stockBoutique
    //    [statistiques des ventes]
    //      - fournisseur (A, B, C),
    //      - prix d'achat (9, 10, 11),
    //      - gabarie (petit en dessous 2L , moyen entre 2L et 3L, grand entre 3L et 5L, hors gabarie au dessus de 5L),
    //      - matière (cuir , imitation crocodile, imitation fourrure, tissue, paille, polymère ...)
    //      - catégorie ( sac soirée, sac à main, porte feuille, valise, sac de voyage, sac mixte)

    this.saveProduit = this.saveProduit.bind(this);
    this.newProduit = this.newProduit.bind(this);

    this.state = {
      id: null,
      reference: "",
      zoneExposition: "",
      StockBoutique: "",
      prixConseiller: "",
      quantite_total: "",

      submitted: false
    };
  }

  onChangeReference(e) {
    this.setState({
      reference: e.target.value
    });
  }

  onChangeStockBoutique(e) {
    this.setState({
      stockBoutique: e.target.value
    });
  }
  onChangeZoneExposition(e) {
    this.setState({
      zoneExposition: e.target.value
    });
  }
  onChangePrixConseiller(e) {
    this.setState({
      prixConseiller: e.target.value
    });
  }

  onChangeQuantite_total(e) {
    this.setState({
      quantite_total: e.target.value
    });
  }

  saveProduit() {
    var data = {
      reference: this.state.reference,
      zoneExposition: this.state.zoneExposition,
      stockBoutique: this.state.stockBoutique,
      quantite_total: this.state.quantite_total,
      prixConseiller: this.state.prixConseiller,
    };

    ProduitDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          reference: response.data.reference,
          zoneExposition: response.data.zoneExposition,
          stockBoutique: response.data.stockBoutique,
          quantite_total: response.data.quantite_total,
          prixConseiller: response.data.prixConseiller,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduit() {
    this.setState({
      id: null,
      reference: "",
      zoneExposition: "",
      stockBoutique: "",
      quantite_total: "",
      prixConseiller: "",


      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduit}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="reference">Reference</label>
              <input
                type="text"
                className="form-control"
                id="reference"
                required
                value={this.state.reference}
                onChange={this.onChangeReference}
                name="reference"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantite_total">Quantité total</label>
              <input
                type="text"
                className="form-control"
                id="quantite_total"
                required
                value={this.state.quantite_total}
                onChange={this.onChangeQuantite_total}
                name="quantite_total"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prixConseiller">Prix Conseillé</label>
              <input
                type="text"
                className="form-control"
                id="prixConseiller"
                required
                value={this.state.prixConseiller}
                onChange={this.onChangePrixConseiller}
                name="prixConseiller"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zoneExposition">Zone d'exposition</label>
              <br/>
              <Row>
              <Col xs={6}>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"1"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 1<br/>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"2"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 2 <br/>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"3"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 3<br/>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"4"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 4<br/>
              </Col>
              <Col xs={6}>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"5"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 5<br/>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"6"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 6<br/>
              <input
                  type="radio"
                  className="custom-radio"
                  id="zoneExposition"
                  required
                  value={"7"}
                  onChange={this.onChangeZoneExposition}
                  name="zoneExposition"
              /> zone 7<br/>
              </Col>
              </Row>
            </div>

            <div className="form-group">
              <label htmlFor="stockBoutique">StockBoutique</label>
              <input
                  type="text"
                  className="form-control"
                  id="stockBoutique"
                  required
                  value={this.state.stockBoutique}
                  onChange={this.onChangeStockBoutique}
                  name="stockBoutique"
              />
            </div>

            <button onClick={this.saveProduit} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

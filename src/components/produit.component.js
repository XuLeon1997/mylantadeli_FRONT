import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Produit extends Component {
  constructor(props) {
    super(props);
    this.onChangeReference = this.onChangeReference.bind(this);
    this.onChangePrixConseiller = this.onChangePrixConseiller.bind(this);
    this.onChangeQuantite_total = this.onChangeQuantite_total.bind(this);
    this.onChangeZoneExposition = this.onChangeZoneExposition.bind(this);
    this.onChangeStockBoutique = this.onChangeStockBoutique.bind(this);
    this.getProduit = this.getProduit.bind(this);
    this.updateProduit = this.updateProduit.bind(this);
    this.deleteProduit = this.deleteProduit.bind(this);

    this.state = {
      currentProduit: {
        id: null,
        reference: "",
        zoneExposition: "",
        stockBoutique: "",
        prixConseiller: "",
        quantite_total: ""
      },
      zoneExpositionActuel: "",
      message: ""
    };
  }

  componentDidMount() {
    this.getProduit(this.props.match.params.id);
  }

  onChangeReference(e) {
    const reference = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduit: {
          ...prevState.currentProduit,
          reference: reference
        }
      };
    });
  }


  onChangeZoneExposition(e) {
    const zoneExposition = e.target.value;

    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        zoneExposition: zoneExposition
      }
    }));
  }

  onChangeStockBoutique(e) {
    const stockBoutique = e.target.value;

    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        stockBoutique: stockBoutique
      }
    }));
  }

  onChangePrixConseiller(e) {
    const prixConseiller = e.target.value;

    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        prixConseiller: prixConseiller
      }
    }));
  }

  onChangeQuantite_total(e) {
    const quantite_total = e.target.value;

    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        quantite_total: quantite_total
      }
    }));
  }

  getProduit(id) {
    ProduitDataService.get(id)
      .then(response => {
        this.setState({
          currentProduit: response.data,
          zoneExpositionActuel: response.data.zoneExposition
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateProduit() {
    ProduitDataService.update(
      this.state.currentProduit.id,
      this.state.currentProduit
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Produit was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduit() {
    ProduitDataService.delete(this.state.currentProduit.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produits')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduit } = this.state;

    return (
      <div>
        {currentProduit ? (
          <div className="edit-form">
            <h4>Produit</h4>
            <form>
              <div className="form-group">
                <label htmlFor="reference">Reference</label>
                <input
                  type="text"
                  className="form-control"
                  id="reference"
                  value={currentProduit.reference}
                  onChange={this.onChangeReference}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite_total">Quantité total</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantite_total"
                  value={currentProduit.quantite_total}
                  onChange={this.onChangeQuantite_total}
                />
              </div>

              <div className="form-group">
                <label htmlFor="zoneExposition">Zone d'exposition actuel {this.state.zoneExpositionActuel} </label>
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
                <label htmlFor="prixConseiller">Prix Conseillé</label>
                <input
                    type="text"
                    className="form-control"
                    id="prixConseiller"
                    required
                    value={currentProduit.prixConseiller}
                    onChange={this.onChangePrixConseiller}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stockBoutique">StockBoutique</label>
                <input
                    type="text"
                    className="form-control"
                    id="stockBoutique"
                    required
                    value={currentProduit.stockBoutique}
                    onChange={this.onChangeStockBoutique}
                />
              </div>



            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduit}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduit}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Produit...</p>
          </div>
        )}
      </div>
    );
  }
}

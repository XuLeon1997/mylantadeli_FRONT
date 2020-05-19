import React, { Component } from "react";
import Style from "styled-components";
import ProduitDataService from "../services/produit.service";
import ee from 'event-emitter';

const Container = Style.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: absolute;
    top:${props => props.top}px;
    right:16px;
    z-index:999;
    transition: top 0.5s ease;
`

const emitter = new ee();

export const notify = (msg) => {
    emitter.emit('notification', msg);
}

export default class Notifications extends Component {

    constructor(props) {
        super(props);
        this.retrieveProduits = this.retrieveProduits.bind(this);
        this.state = {
            top:-200,
            Produits: [],
        };
        this.timeout =null;

        emitter.on('notification', (msg) => {

        });
    }

    componentDidMount() {
        this.retrieveProduits();
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


    onShow = (msg) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.setState({top: -200}, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(msg);
                }, 500);
            });
        }else{
            this.showNotification(msg);
        }
    }


    showNotification = () =>{
        this.setState({
           top: 60
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -200
                });
            }, 5000);
        });
    }

    render() {
        const { searchReference, Produits, currentProduit, currentIndex } = this.state;
        return (
            <div>
                <Container top={this.state.top}>
                    <h6>Réassort stock boutique</h6>
                    {/*todo : notification par quantité en dessous de 10 pièces*/}
                    <ul className="list-group">
                        {Produits &&
                        Produits.map((Produit, index) => (
                            parseInt(Produit.stockBoutique) < 11?
                                <li className="list-group">
                                <span className="alignReference">
                                    <b>{Produit.reference}</b>
                                    <span title={"quantité entrepôt : "+ (parseInt(Produit.quantite_total) - parseInt(Produit.stockBoutique)) } className="alerte1"> ⚠ {Produit.stockBoutique}</span>
                                </span>
                            </li>: null

                        ))}
                    </ul>
                </Container>
                <button className="notificationButton" onClick={this.onShow}> 🔔 </button>
            </div>

        );
    }
}

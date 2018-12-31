import React, {Component} from 'react';
import Carta from './Carta';
import './Tablero.css';

export default class Tablero extends Component{
    render(){
        
        return(
            <div className="tablero">
                {
                    this.props.baraja
                        .map((cartas, i) => {
                        const estaSiendoComparada = this.props.parejaSeleccionada.indexOf(cartas) > -1;            
                        return  <Carta
                        key= {i}
                        icono={cartas.icono}
                        estaSiendoComparada={estaSiendoComparada}
                        seleccionarCarta={ () => this.props.seleccionarCarta(cartas)}
                        fueAdivinada={cartas.fueAdivinada}
                        />;
                    })
                }
            </div>
        );
    }
};
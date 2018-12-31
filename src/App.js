import React, { Component } from 'react';
import Header from './Header';
import Tablero from './Tablero';
import './App.css';
import ConstruirBaraja from './utils/construirBaraja'

const getEstadoInicial = () =>  {
  const baraja = ConstruirBaraja();

  return {
    baraja,
    parejaSeleccionada: [],
    estaComparando: false,
    numeroDeIntentos: 0
  };
}
class App extends Component {
  constructor(props){
      super(props);
      this.state = getEstadoInicial();
  }
  render() {
    return (
      <div className="App">
        <Header
          numeroDeIntentos={this.state.numeroDeIntentos}
          resetearPartida={() =>  this.resetearPartida()}
        />
        <Tablero
          baraja={this.state.baraja} 
          parejaSeleccionada={this.state.parejaSeleccionada}
          seleccionarCarta={(cartas) => this.seleccionarCarta(cartas) } 
        />
      </div>
    );
  }

  seleccionarCarta(cartas) {
      if (
         this.state.estaComparando ||
         this.state.parejaSeleccionada.indexOf(cartas) > -1 ||
         cartas.fueAdivinada ){
         return ;   
      }
      const parejaSeleccionada = [...this.state.parejaSeleccionada, cartas ];
      this.setState({
        parejaSeleccionada
      });
      
      if(parejaSeleccionada.length === 2){
        this.compararPareja(parejaSeleccionada);
      }
  }

  compararPareja(parejaSeleccionada) {
    this.setState({ estaComparando: true});
    setTimeout(() => {
      const  [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      if(primeraCarta.icono === segundaCarta.icono){
        baraja = baraja.map((cartas) => {
          if(cartas.icono !== primeraCarta.icono ){
            return cartas;
          }
          return  {...cartas, fueAdivinada: true};
        });
      }
    
      this.verificarSiHayGanador(baraja);
      this.setState({
        parejaSeleccionada: [],
        baraja,
        estaComparando: false,
        numeroDeIntentos: this.state.numeroDeIntentos + 1
      })
    }, 1000)

    
  }

  verificarSiHayGanador(baraja){
    if(
      baraja.filter((cartas) => !cartas.fueAdivinada).length === 0 
    ){
      alert(`Ganaste ${this.state.numeroDeIntentos}en`)
    }
 }

 resetearPartida(){
    this.setState(
      getEstadoInicial()
    );

 }

}

export default App;

import React, { Component } from 'react'

export default class DecrementeButton extends Component {
  handleButtonClick = () =>{
    this.props.onDecrement('-')
  }
  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-effect naves-light btn red darken-4"
      >-</button>  
      
    );
  }
}

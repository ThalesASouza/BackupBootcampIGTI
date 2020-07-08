import React, { Component } from 'react'

export default class IncrementeButton extends Component {
  handleButtonClick = () =>{
    this.props.onIncrement('+')
  }
  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-effect naves-light btn green darken-4"
      >+</button>  
      
    );
  }
}

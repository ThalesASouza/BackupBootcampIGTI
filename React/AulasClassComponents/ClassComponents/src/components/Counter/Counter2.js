import React, { Component } from 'react'
import css from './counter.module.css';
import IncrementeButton from './IncrementeButton';
import DecrementeButton from './DecrementeButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType);
  }

  render() {
   const {countValue,currentStep} = this.props;
    return(
      <div className={css.counterContainer}>
        <DecrementeButton onDecrement={this.handleButtonClick} />
        <Value value={countValue}/>
        <IncrementeButton onIncrement = {this.handleButtonClick}/>
        <Steps steps={currentStep}/>
       
      </div>
    );
  }
}

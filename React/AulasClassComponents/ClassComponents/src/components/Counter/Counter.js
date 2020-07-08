import React, { Component } from 'react'
import css from './counter.module.css';
import IncrementeButton from './IncrementeButton';
import DecrementeButton from './DecrementeButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 2,
      steps: 0,
    };

  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter: clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementeButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementeButton onIncrement={this.handleButtonClick} />
        <Steps steps={steps} />

      </div>
    );
  }
}

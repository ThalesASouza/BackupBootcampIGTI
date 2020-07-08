import React, { Component } from 'react'
import User from './User';

export default class Users extends Component {
  constructor(){
    super();

    this.state = {
      secondVisible: 0,
    };
    this.interval = null;
  }
  
  
  componentDidMount(){
    console.log('componentDidMount');
    this.interval = setInterval(() =>{
      const {secondVisible} = this.state;
      this.setState({
        secondVisible: secondVisible + 1
      })
    }, 1000)
  }
  componentDidUpdate() {
    console.log('componentDidUpdate de App.js');
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    console.log('componentWillUnmount de App.js');
    
  }

  render() {
    const {users} = this.props;
    const {secondVisible} = this.state;
    return (
      <div>
        <p>Componente Users visivel por {secondVisible} segundos</p>
        <ul>
          {users.map(user => {
            const {login} = user; 
            return (
              <li key={login.uuid}>
                <User user={user}/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

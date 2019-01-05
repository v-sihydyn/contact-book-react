import React, { Component } from 'react';
import './App.scss';
import ContactsList from "./containers/ContactsList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactsList />
      </div>
    );
  }
}

export default App;

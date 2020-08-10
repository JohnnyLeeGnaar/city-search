import React from 'react';
import Table from './components/Table';
import Toolbar from './components/Toolbar';
import "./App.css"

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Toolbar />
        <Table />
      </div>
    );
  }
}

export default App;

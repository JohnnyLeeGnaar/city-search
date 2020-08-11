import React from 'react';
import Table from './components/Table';
import Toolbar from './components/Toolbar';
import "./App.css"

class App extends React.Component {
  state = {
    page: 1,
    pageSize: 10,
    order: 'asc',
    orderKey: 'name',
    search: ''
  }

  sortHandler = newOrderKey => {
    const { order, orderKey } = this.state;
    let newOrder;

    if(newOrderKey === orderKey) {
      if(order === 'asc') {
        newOrder = 'desc';
      } else if(order === 'desc') {
        newOrder = 'asc';
      }
    } else {
      newOrder = 'asc'
    }

    this.setState({orderKey: newOrderKey, order: newOrder});
  }
  
  render() {
    const { order, orderKey } = this.state;

    return (
      <div className="app">
        <Toolbar />
        <Table order={order} orderKey={orderKey} onHeaderClick={this.sortHandler}/>
      </div>
    );
  }
}

export default App;

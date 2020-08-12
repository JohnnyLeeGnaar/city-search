import React from 'react';
import Table from './components/Table';
import Toolbar from './components/Toolbar';
import "./App.css"

class App extends React.Component {

  state = {
    page: 1,
    pageSize: 10,
    orderByValue: 'name',
    orderByDirection: 'asc',
    search: ''
  }
  nextSortOrder = (val) => {
    let next;

	if (val === '') {
        next = 'asc';
    } else if (val === 'asc') {
        next = 'desc';
    } else if (val === 'desc') {
        next = 'asc';
    }
    return next;
  }


  changeDirection = (newOrderByVal) => {
    const {orderByDirection} = this.state;
    let direction =  this.nextSortOrder(orderByDirection)

    this.setState({
      orderByValue: newOrderByVal,
      orderByDirection: direction
    });
  }
  render() {
    const {orderByValue, orderByDirection} = this.state;
    
    return (
      <div className="app">
        <Toolbar />
        <Table orderByValue={orderByValue} orderByDirection={orderByDirection} onHeaderClick={this.changeDirection} />
      </div>
    );
  }
}

export default App;


/*const nextSortOrder = (current) => {
	let next;

	if (current == '') {
		next = 'asc';
	} else if (current == 'asc') {
		next = 'desc';
	} else if (current == 'desc') {
		next = 'asc';
	}

	return next;
}*/
import React from 'react';
import "../App.css";

class Toolbar extends React.Component {

  //constructor(props) {    super(props);    this.state = {date: new Date()};  }

  //lifecycle methods

  componentDidMount(){
  }
  componentWillUnmount(){
  }

  render() {
    return (
        <div className="toolbar">
			<input type="text" className="search" placeholder="Search for a city or county"/>
			<select className="page-size-dropdown">
				<option value="5">5</option>
				<option defaultValue="10">10</option>
				<option value="25">25</option>
			</select>
			<div className="table-visible-columns"></div>
		</div>
    );
  }
}

export default Toolbar;

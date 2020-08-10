import React from 'react';
import TableHeaderRender from './TableHeaderRender.js'
import TableBodyRender from './TableBodyRender.js'
import "../App.css";

class Table extends React.Component {

  //constructor(props) {    super(props);    this.state = {date: new Date()};  }

  //lifecycle methods

  componentDidMount(){
  }
  componentWillUnmount(){
  }

  render() {
    return (
        <table className="table">
			<thead>
				<tr className="table-heading-row">
					<TableHeaderRender />
				</tr>
			</thead>
			<tbody className="table-body">
					<TableBodyRender />
			</tbody>
		</table>
    );
  }
}

export default Table;

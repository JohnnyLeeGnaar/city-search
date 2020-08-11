import React from 'react';
import TableHeader from './TableHeader';
import TableBodyRender from './TableBodyRender';

class Table extends React.Component {
  state = {

    headers: [{
      name: "City name",
      value: "name",
      visible: true
    },
    {
      name: "Population",
      value: "population",
      visible: true
    },
    {
      name: "County",
      value: "adminName1",
      visible: true
    }]
  }
  //constructor(props) {    super(props);    this.state = {date: new Date()};  }

  //lifecycle methods

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    const { order, orderKey, onHeaderClick } = this.props;
    const { headers } = this.state;

    return (
      <table className="table">
        <thead>
          <tr className="table-heading-row">
            {headers.map(header => (
              <TableHeader key={header.value} data={header} order={order} orderKey={orderKey} onClick={onHeaderClick} />)
            )}
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

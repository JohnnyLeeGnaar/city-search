import React from 'react';
import Table from './components/Table';
import TablePagination from './components/TablePagination';
import Toolbar from './components/Toolbar';
import "./App.css"
import api from './components/api';
import UpdateUrlQueryParams from './components/UpdateUrlQueryParams';
import ParseUrlQueryParams from './components/ParseUrlQueryParams';

class App extends React.Component {

  state = {
    page: 1,
    pageSize: 25,
    orderByValue: 'name',
    orderByDirection: 'asc',
    search: '',
    items: [],
    pages: null
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
  fetchData = () => {
    const { page, pageSize, orderByValue, orderByDirection, search } = this.state;
    this.setState({
      items: [],
      pages: null
    }, () => api(page, pageSize, orderByValue, orderByDirection, search).then(result => this.setState({ items: result.data, pages: result.metadata.pages }),
      UpdateUrlQueryParams({ orderByValue, orderByDirection, search, pageSize, page })
    ));
  }

  changeDirection = (newOrderByVal) => {
    const { orderByDirection } = this.state;
    let direction = this.nextSortOrder(orderByDirection)

    this.setState({
      page: 1,
      orderByValue: newOrderByVal,
      orderByDirection: direction
    }, () => this.fetchData());
  }

  changePageSize = (newPageSize) => {
    this.setState({
      page: 1,
      pageSize: newPageSize
    }, () => this.fetchData());
  }

  changeSearchQuery = (newSearch) => {
    this.setState({
      page: 1,
      search: newSearch
    }, () => this.fetchData());
  }

  changePage = page => {
    this.setState({
      page
    }, () => this.fetchData());
  }

  componentDidMount() {
    const { orderByValue, orderByDirection, search, pageSize, page } = this.state;
    const parsedQueryParam = ParseUrlQueryParams({orderByValue, orderByDirection, search, pageSize, page});
    const { byValue, byDirection, filter, pageLength, items } = parsedQueryParam;

    this.setState({
      orderByValue: byValue,
      orderByDirection: byDirection,
      search: filter,
      pageSize: pageLength,
      page: items
    }, () => this.fetchData());

  }

  render() {
    const { orderByValue, orderByDirection, items, search, pageSize, page, pages } = this.state;

    return (
      <div className="app">
        <Toolbar search={search} pageSize={pageSize} changePageSize={this.changePageSize} changeSearchQuery={this.changeSearchQuery} />
        <Table orderByValue={orderByValue} orderByDirection={orderByDirection} onHeaderClick={this.changeDirection} bodyItems={items} />
        <TablePagination page={page} pages={pages} changePage={this.changePage} />
      </div>
    );
  }
}

export default App;
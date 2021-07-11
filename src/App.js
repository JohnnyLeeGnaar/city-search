import React from "react";
import ReactTooltip from "react-tooltip";
import Table from "./components/Table";
import Map from "./components/Map";
import TablePagination from "./components/TablePagination";
import Toolbar from "./components/Toolbar";
import "./App.css";
import api from "./utils/api";

class App extends React.Component {
  state = {
    page: 1,
    pageSize: 25,
    orderByValue: "name",
    orderByDirection: "asc",
    search: "",
    items: [],
    pages: null,
    map: "",
  };

  nextSortOrder = (val) => {
    let next;

    if (val === "") {
      next = "asc";
    } else if (val === "asc") {
      next = "desc";
    } else if (val === "desc") {
      next = "asc";
    }
    return next;
  };
  fetchData = () => {
    const { page, pageSize, orderByValue, orderByDirection, search } =
      this.state;
    this.setState(
      {
        items: [],
        pages: null,
      },
      () =>
        api(page, pageSize, orderByValue, orderByDirection, search).then(
          (result) =>
            this.setState({ items: result.data, pages: result.metadata.pages })
          /*
          updateUrlQueryParams({
            orderByValue,
            orderByDirection,
            search,
            pageSize,
            page,
          })
          */
        )
    );
  };

  changeDirection = (newOrderByVal) => {
    const { orderByDirection } = this.state;
    let direction = this.nextSortOrder(orderByDirection);

    this.setState(
      {
        page: 1,
        orderByValue: newOrderByVal,
        orderByDirection: direction,
      },
      () => this.fetchData()
    );
  };

  changePageSize = (newPageSize) => {
    this.setState(
      {
        page: 1,
        pageSize: newPageSize,
      },
      () => this.fetchData()
    );
  };

  changeSearchQuery = (newSearch) => {
    this.setState(
      {
        page: 1,
        search: newSearch,
      },
      () => this.fetchData()
    );
  };

  changePage = (page) => {
    this.setState(
      {
        page,
      },
      () => this.fetchData()
    );
  };

  changeMap = (Newmap) => {
    this.setState({
      map: Newmap,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      orderByValue,
      orderByDirection,
      items,
      search,
      pageSize,
      page,
      pages,
      map,
    } = this.state;

    return (
      <div className="app">
        <Toolbar
          search={search}
          pageSize={pageSize}
          changePageSize={this.changePageSize}
          changeSearchQuery={this.changeSearchQuery}
        />
        <div className="table-map-flex-wrapper">
          <div className="table-wrapper">
            <Table
              orderByValue={orderByValue}
              orderByDirection={orderByDirection}
              onHeaderClick={this.changeDirection}
              bodyItems={items}
              pageSize={pageSize}
            />
          </div>

          <Map
            bodyItems={items}
            changeMap={this.changeMap}
            changeSearchQuery={this.changeSearchQuery}
          />
          <ReactTooltip>{map}</ReactTooltip>
        </div>

        <TablePagination
          page={page}
          pages={pages}
          changePage={this.changePage}
        />
      </div>
    );
  }
}
export default App;

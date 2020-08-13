import React from 'react';

class Toolbar extends React.Component {

  render() {
    const { pageSize, search, changePageSize, changeSearchQuery } = this.props;
    const pageSizes = [5, 10, 25];

    return (
      <div className="toolbar">
        <input type="text" className="search" value={search} placeholder="Search for a city or county" onChange={e => changeSearchQuery(e.target.value)} />
        <select className="page-size-dropdown" value={pageSize} onChange={e => changePageSize(e.target.value)}>
          {pageSizes.map((size, index) => <option value={size} key={index}>{size}</option>)}
        </select>
        <div className="table-visible-columns"></div>
      </div>
    );
  }
}

export default Toolbar;

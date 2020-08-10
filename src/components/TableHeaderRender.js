import React from 'react';
import "../App.css";


class TableHeaderRender extends React.Component{
  constructor(props) {    
    super(props);    
    this.state = {
      
      headers: [{
        name: "City name",
        value: "name",
        visible: true,
        active: true,
        order: 'asc'
    
      },
      {
        name: "Population",
        value: "population",
        visible: true,
        active: false,
        order: ''
    
      },
      {
        name: "County",
        value: "adminName1",
        visible: true,
        active: false,
        order: ''
      }]
    
      }
      this.sortByHandler = this.sortByHandler.bind(this);
    }


  sortByHandler(props){
    // let items = [...this.state.headers];
    //console.log(items);
  

    // 
    this.setState((state, props) => ({
    headers: this.state.headers.map(header => (header.value === props.value ? Object.assign(header, {active: !props.active}) : header),
    
    
    )}
    
    ))}

     render(){
       const headerRender = this.state.headers.map(header => {
          return (<th key={header.value} onClick={() => this.sortByHandler(header)} className={"table-heading " 
          + (header.active ? 'active' : '')}>{header.name}</th>) 
      })
    return headerRender
  }
}
export default TableHeaderRender;

/*sortByHandler(props){

    let items = [...this.state.headers];
    for(let i = 0; i<items.length;i++){
      if(items[i].value === props.value){
        items[i].active = !props.active;
      }

    }*/
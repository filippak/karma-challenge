import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import logo from './images/logo.png';
import './style/App.css';
import './style/sortstyle.css';

export class SortComponent extends Component {
  constructor(props) {
  super(props);

  this.handleClick = this.handleClick.bind(this);
}


handleClick(event) {
  this.props.sortBy(event.target.value);
  //change style of buttons
  if(event.target.value == "price") {
    document.getElementById("price").className = "sort-button-clicked btn solid";
    document.getElementById("title").className = "sort-button btn outline";
    document.getElementById("location").className = "sort-button btn outline";
  } else if (event.target.value == "title") {
    document.getElementById("title").className = "sort-button-clicked btn solid";
    document.getElementById("price").className = "sort-button btn outline";
    document.getElementById("location").className = "sort-button btn outline";
  } else if (event.target.value == "location") {
    document.getElementById("location").className = "sort-button-clicked btn solid";
    document.getElementById("title").className = "sort-button btn outline";
    document.getElementById("price").className = "sort-button btn outline";
  }
}
  render() {
    return (
      <div className="sort-buttons">
        <button className="sort-button btn outline" id="location" value="location" onClick={this.handleClick}>Nära dig</button>
        <button className="sort-button btn outline" id="price" value="price" onClick={this.handleClick}>Pris</button>
        <button className="sort-button btn outline" id="title" value="title" onClick={this.handleClick}>Vara</button>

    </div>

    )
  }
}

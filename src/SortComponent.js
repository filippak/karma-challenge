import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  browserHistory
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import logo from './images/logo.png';
import './style/App.css';
import './style/sortstyle.css';

export class SortComponent extends Component {
  sort (field) {
    document.getElementById(field).className = "btn btn-primary";
    this.props.sortBy(field);
  }
  constructor(props) {
  super(props);
  this.state = {value: 'price'};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  this.setState({value: event.target.value});

}

handleSubmit(event) {
  //alert('Your favorite flavor is: ' + this.state.value);
  this.setState({value: event.target.value});
  event.preventDefault();
  console.log(event.target.value);
  this.props.sortBy(event.target.value);
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
        <button className="sort-button btn outline" id="location" value="location" onClick={this.handleSubmit}>Nära dig</button>
        <button className="sort-button btn outline" id="price" value="price" onClick={this.handleSubmit}>Pris</button>
        <button className="sort-button btn outline" id="title" value="title" onClick={this.handleSubmit}>Vara</button>

    </div>

    )
  }
}

import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style/App.css';
import {SortComponent} from './SortComponent'

const KEYS_FOR_LOC_FILTER = ['loc.address', 'loc.name', 'loc.city', 'loc.description']

export class LocationComponent extends Component {
  constructor(props) {
  super(props);
  this.state = {
    searchTerm: ''
    //locations: []
  };
  }

  searchUpdated (term) {
    this.setState({
      searchTerm: term
    })
  }

  componentDidMount () {
  }
  render (){
    const filteredLocations = this.props.locationsFromParent.filter(createFilter(this.state.searchTerm, KEYS_FOR_LOC_FILTER));
    var allLocations = filteredLocations.map(function(loc, index) {
      var allItems = loc.items.map((item, index) => {
        return (
        <h4> {item.title} </h4>
        )
      });
         return(
           <div className="" key={index}>
             <div className="locationContainer col-md-6 col-lg-6 col-sm-12">
            <div className="col-md-12">
            <div className="imgContainer">
             <img src={(loc.loc.logo_url)} alt="" className="imgCard"/>
            </div>
             <h1>{loc.loc.name}</h1>
             {allItems}
           </div>
         </div>
         </div>
         )
    });
    return (
      <div>
            <div className="input-group">
              <SearchInput className="search-input input-group" onChange={this.searchUpdated} />
            </div>
        <div className="all-locations">
            <h1>All locations</h1>
            {allLocations}
        </div>
      </div>

    );
  }
}

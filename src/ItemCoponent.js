import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style/App.css';
import './style/itemstyle.css'
import './style/searchstyle.css'
import './style/sortstyle.css'
import './style/searchstyle.css'
import logo from './images/logo.png';
import {SortComponent} from './SortComponent'

const KEYS_FOR_FILTER = ['item.name', 'item.title', 'loc.address', 'item.ingredients']

export class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchUpdated = this.searchUpdated.bind(this);
  }
    searchUpdated (term) {
      this.setState({
        searchTerm: term
      })
    }

    updateData (filteredData) {
      this.setState({
        //update parent function
      })
    }

    sortBy(field) {
      var sortedItems = this.props.itemsFromParent.sort( (a, b) => {
        if(field === "price") {
          if (a.item.price > b.item.price) {
            return 1;
          }
          if (a.item.price < b.item.price) {
            return -1;
          }
          return 0;
        }
        if(field === "title") {
          if (a.item.title > b.item.title) {
            return 1;
          }
          if (a.item.title < b.item.title) {
            return -1;
          }
          return 0;
        }
        if(field === "location") {
          if (a.dist > b.dist) {
            return 1;
          }
          if (a.dist < b.dist) {
            return -1;
          }
          return 0;
        }
      });
      this.updateData(sortedItems);
    }

    componentDidMount () {
      this.sortBy("location");
    }

    render () {
      console.log(this.props.itemsFromParent);
      const filteredItems = this.props.itemsFromParent.filter(createFilter(this.state.searchTerm, KEYS_FOR_FILTER));
        var allItems = filteredItems.map(function(item, index) {
              //var pathName = "/item/"+item.item.id;
              var price = item.item.price / 100;
              var distance =(item.dist / 1000).toFixed(1);
           return(
             <div key={item.item.id} className="items-container">
             <div className="col-md-4 col-lg-3 col-sm-6 col-xs-12" key={item.item.id}>
               <div className="itemContainer col-md-12 col-lg-12 col-sm-12">
               <div className="imgContainer">
               <img src={(item.item.image_url)} alt="image" className="imgCard"/>
               </div>
               <h4>{item.item.title} &middot; {price} kr </h4>
               <hr />
                <h4>{item.loc.name} &middot; {distance} km </h4>
                  <h5>{item.loc.address} </h5>
               <p>{item.loc.description}</p>
             </div>
           </div>

           </div>
           )
      });
      return (
        <div className="containter">
          <div className="filter-row">
            <div className="sort-search">
            <div className="filter-block">
              <img src={logo} className="logo-icon" />
              </div>
              <div className="filter-block search">
                <SearchInput className="search-input input-group" onChange={this.searchUpdated} />
              </div>
            </div>
              <div className="sort-block">
              <SortComponent sortBy={this.sortBy.bind(this)} />
              </div>
            </div>
            <hr />
          <div className="all-items">
          {allItems}
        </div>
      </div>
      );
    }
}

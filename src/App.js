import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import logo from './images/logo.png';
import './style/App.css';
import {ItemComponent} from './ItemCoponent'
import {LocationComponent} from './LocationComponent'


const HeaderPanel = React.createClass({
  render () {
    return (
      <div className="panel-header">
        <div className="panel-header-text">
            <h1> Rädda mat med Karma </h1>
            <h4> Hitta och köp från Stockholms bästa caféer och restauranger </h4>
        </div>
      </div>
    )
  }
})

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    items: [],
    locations: [],
    locationsLoaded: false
  };

  this.getDistance = this.getDistance.bind(this);
}

getDistance (location) {
  var lon = location.longitude;
  var lat = location.latitude;
  var latHome = 59.331397;
  var lonHome = 18.057855;

  var R = 6371000; //radius
  var phi_1 = lat * Math.PI / 180;
  var phi_2 = latHome * Math.PI / 180;
  var d_lat = (latHome-lat) * Math.PI / 180;
  var d_lon = (lonHome-lon)* Math.PI / 180;


  var a = Math.sin(d_lat/2) * Math.sin(d_lat/2) + Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(d_lon/2) * Math.sin(d_lon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //distance in meters
  var d = R * c;
  // console.log("new distance");
  // console.log(d);
  return(d);
}

  componentDidMount () {
    //get items
    var items = [];
    var locations = [];
    const itemsUrl = "http://case.karma.life/viewer/items"
    fetch(itemsUrl).then(r => r.json()).then(response => {
      var allItems = this.getLocsForItems(response);
      items = allItems;
      this.setState({
       items: allItems
      });
    });
    //get locations
    const locationsUrl = "http://case.karma.life/viewer/locations"
    fetch(locationsUrl).then(r => r.json()).then(response => {
      var locs = this.getItemsForLoc(response);
      locations = locs;
      this.setState({
       locations: locs,
        locationsLoaded: true
      });
      //console.log(this.state.locations);
    });

    // this.setState({
    //   items: items,
    //   locations: locations
    // });
  }

  getItemsForLoc(locations) {
    var ItemLoc = [];
    locations.map(function(loc, index) {
      var toPush = {loc: Object, items: Object};
      toPush.loc = loc;
      const url = "http://case.karma.life/viewer/locations/"+loc.id+"/items";
      fetch(url).then(r => r.json()).then(response => {
        toPush.items = response;
      });
      ItemLoc.push(toPush);
    });
    return ItemLoc;
  }


  getLocsForItems(itms) {
    var ItemLoc = [];
    var self = this;
    itms.map(function(item, index) {
      var toPush = {item: Object, loc: Object, dist: Number};
      const locationsUrl = "http://case.karma.life/viewer/locations/"+item.location_id;
      fetch(locationsUrl).then(r => r.json()).then(response => {
        var location = response[0];
        toPush.loc = location;
        var distance = self.getDistance(location);
        toPush.dist = distance;
      });
      toPush.item = item;
    //  self.getDistance(toPush.loc.longitude, toPush.loc.latitude);
      //toPush.dist = distance;
      ItemLoc.push(toPush);
    });
    return ItemLoc;
  }

  updateStateFromChild(updatedData) {
    this.setState({
      items: updatedData
    });
  }

  render() {
    return (
      <div className="App">
      <HeaderPanel />
      <ItemComponent updateState={this.updateStateFromChild} itemsFromParent={this.state.items} />
      </div>
    )
  }
}

<App itemData="items" />

export default App;

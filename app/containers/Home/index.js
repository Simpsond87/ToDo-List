/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {

  constructor(){
    super();
    this.state = {
      listItems:[],
      inputItem:""
    }
  };

  storeItem = () => {

    let listItems = this.state.listItems;
    let inputItem = this.state.inputItem;

    if(inputItem !== "")
    {
      listItems.push(inputItem);

      this.setState({
        listItems:listItems,
        inputItem:""
      })
    }
  };

  handleItem = (event) => {
    this.setState({
      inputItem: event.target.value
    })
  };

  handleEnter = (event) => {
    //console.log(event.keyCode);
    if(event.keyCode === 13)
    {
        this.storeTask();
    }
  };

  strike = (event) => {
    let item = event.target;
    if (item.style.textDecoration === 'line-through')
    {
      item.style.textDecoration = 'none';
    }
    else
    {
      item.style.textDecoration = 'line-through';
    }
  };

  removeItem = (index) => {
    let listItems = this.state.listItems;
    let inputItem = this.state.inputItem;

    if(listItems !== null)
    {
      listItems.splice(index, 1);

      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }
  };

  destroyOne = (id, index) => {
    fetch('http://localhost:8000/api/deleteOne/'+id, {
      method:'POST',
      mode:'no-cors'
    })
    .then(function(){
      let listItems = this.state.listItems;
      listItems.splice(index, 1);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))

  };

  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };

  storeTask = () => {
    let data = new FormData();
    data.append('taskContent', this.state.inputItem);

    fetch('http://localhost:8000/api/storeTask', {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.task);
      this.setState({
        listItems:listItems,
        inputItem:""
      })
      this.forceUpdate();
    }.bind(this))
  };

  componentWillMount() {
    this.getTasks();
  }

  render() {
    return (
      <div className="container">
        <Helmet title="To-Do List" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className="inputContainer">
            <input type="text" className="todoInput" onChange={this.handleItem} onKeyDown={this.handleEnter}
              value={this.state.inputItem}/>
            <input type="submit" value="Add to List" className="todoButton" onClick={this.storeTask} />
        </div>

        <div>
          {this.state.listItems.map((item, index) => (
            <div className="listItemBox" key={index}>
              <input type="button" className="listItem" onClick={this.strike} value={item.taskContent}/>
              <input type="button" className="removeButton" onClick={() => this.destroyOne(item.id, index)} value="Remove"/>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};

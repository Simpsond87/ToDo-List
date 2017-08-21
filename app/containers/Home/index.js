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
      listItems:["Make Crepes", "Watch the Solar Eclipse"],
      inputItem:""
    }
  }

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
  }

  handleItem = (event) => {
    this.setState({
      inputItem: event.target.value
    })
  }

  handleEnter = (event) => {
    console.log(event.keyCode);
    if(event.keyCode === 13)
    {
        this.storeItem();
    }
  }

  removeItem = () => {
  }

  render() {
    return (
      <div className="container">
        <Helmet title="To-Do List" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className="inputContainer">
            <input type="text" className="todoInput" onChange={this.handleItem} onKeyDown={this.handleEnter}
              value={this.state.inputItem}/>
            <input type="submit" value="Add to List" className="todoButton" onClick={this.storeItem} />
            <input type="button" value="Remove From List" className="todoButton" onClick={this.removeItem}/>
        </div>

        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index}>
              {item}
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

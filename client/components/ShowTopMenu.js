/** client/components/ShowTopMenu.js **/

import React from 'react';

const ShowTopMenu = React.createClass( {
  render: function () {
    return (
      <div className="ui fixed menu">
        <div className="ui container">
          <a href="#" className="header item">
            My Todo App
          </a>
          
          <div className="right menu">
            <div className="item">Hello <strong>{this.props.username}</strong>!</div>
            <a href="#" className="item">Logout</a>
          </div>
        </div>
      </div>
    );
  }
} );

export default ShowTopMenu;

/*
 
 */
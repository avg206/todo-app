/** client/components/main-view/ShowTopBar.js **/

import React from 'react';
import SortField from './ShowSortField';

const ShowTopBar = React.createClass( {
  getInitialState: function () {
    return {
      filter:         1,
      completeButton: 0
    };
  },
  
  componentWillUnmount: function () {
    jQuery( this.refs.filterDropdown ).dropdown( 'destroy' );
  },
  
  componentDidMount: function () {
    jQuery( this.refs.filterDropdown ).dropdown();
  },
  
  componentDidUpdate: function () {
    jQuery( this.refs.filterDropdown ).dropdown( 'refresh' );
  },
  
  handleFilterChange: function ( e ) {
    this.props.onFilterName( e.target.value );
  },
  
  handleDropdownChange: function ( val ) {
    return () => {
      switch ( val ) {
        case 1:
          this.props.onFilterName( '' );
          break;
        
        case 2:
          this.props.onFilterStatus( 0 );
          break;
      }
      
      this.setState( { filter: val } );
    };
  },
  
  handleCompleteChange: function ( val ) {
    return () => {
      this.setState( { completeButton: val } );
      this.props.onFilterStatus( val );
    };
  },
  
  render: function () {
    let filter;
  
    switch ( this.state.filter ) {
      case 1:
        filter = <input type="text" onChange={this.handleFilterChange} placeholder="Start typing name..." value={this.props.filter.val}/>;
        break;
    
      case 2:
        filter = (
          <div className="ui buttons top-line__filter-buttons">
            <button onClick={this.handleCompleteChange(0)}
                    className={`ui ${this.state.completeButton == 0 ? "active" : ""} basic button`}>All
            </button>
          
            <button onClick={this.handleCompleteChange(2)}
                    className={`ui ${this.state.completeButton == 2 ? "active" : ""} basic button`}>Completed
            </button>
          
            <button onClick={this.handleCompleteChange(1)}
                    className={`ui ${this.state.completeButton == 1 ? "active" : ""} basic button`}>Incompleted
            </button>
          </div>
        );
        break;
    }

    return (
      <div className="ui form segment top-line">
        <div className="top-line__add-button">
          <button type="submit" className="ui teal basic icon button" onClick={this.props.onClickCreateNew}><i className="plus icon"/> Task</button>
        </div>

        <div className="top-line__filter ui left labeled left input">
          <div className="ui dropdown label" ref="filterDropdown">
            <div className="text">Filter by name:</div>
            <i className="dropdown icon"/>
            <div className="menu">
              <div className="item" onClick={this.handleDropdownChange(1)}>Filter by name:</div>
              <div className="item" onClick={this.handleDropdownChange(2)}>Filter by status:</div>
            </div>
          </div>
          {filter}
        </div>

        <div className="top-line__sort-wrapper">
          <SortField sort={this.props.sort} onSortClick={this.props.onSortClick}/>
        </div>
      </div>
    );
  }
} );

export default ShowTopBar;
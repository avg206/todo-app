/** client/components/TaskForm.js **/

import React from 'react';
import moment from 'moment';

const TaskForm = React.createClass( {
  propTypes: {
    isSending: React.PropTypes.bool.isRequired,
    isFailed:  React.PropTypes.bool.isRequired,
    item:      React.PropTypes.object.isRequired,
    errors:    React.PropTypes.array.isRequired,
    
    onCloseTask:  React.PropTypes.func.isRequired,
    onAddTask:    React.PropTypes.func.isRequired,
    onDeleteTask: React.PropTypes.func.isRequired
  },
  
  componentWillReceiveProps: function ( props ) {
    this.replaceState( props.item );
  },
  
  componentWillMount: function () {
    this.replaceState( this.props.item );
  },
  
  componentWillUnmount: function () {
    jQuery( this.refs.priorityDropdown ).dropdown( 'destroy' );
    jQuery( this.refs.datepicker ).calendar( 'destroy' );
  },
  
  componentDidMount: function () {
    jQuery( this.refs.datepicker ).calendar( {
      type:      'date',
      formatter: {
        date: function ( date ) {
          return moment( date.toISOString() ).format( 'MM/DD/YYYY' );
        }
      },
      onChange:  ( date ) => {
        this.setState( { due_date: moment( date.toISOString() ) } );
      }
    } );
    jQuery( this.refs.priorityDropdown ).dropdown();
  },
  
  componentDidUpdate: function () {
    jQuery( this.refs.priorityDropdown ).dropdown( 'refresh' );
    jQuery( this.refs.datepicker ).calendar( 'refresh' );
  },
  
  handleChange: function ( field, value ) {
    switch ( field ) {
      case 'priority':
        return () => {
          let obj = {};
          obj[ field ] = value;
          
          this.setState( obj );
        };

      default:
        return ( e ) => {
          let obj = {};
          obj[ field ] = e.target.value;

          this.setState( obj );
        };
    }
  },
  
  handleSubmit: function ( e ) {
    e.preventDefault();
    
    this.props.onAddTask( this.state );
  },
  
  handleDeleteClick: function () {
    this.props.onDeleteTask( this.state );
  },
  
  getPriorityFlagClass: function () {
    switch ( this.state.priority ) {
      case 1:
        return 'task-card__priority-flag--low flag icon';

      case 2:
        return 'task-card__priority-flag--medium flag icon';
  
      case 3:
        return 'task-card__priority-flag--high flag icon';
  
      default:
        return 'flag icon';
    }
  },
  
  render: function () {
    return (
      <div className="ui segments">
        <div className={`ui ${this.props.isSending ? "loading" : ""} card form task-card`}>
          <div className="content task-card__top-line">
  
            <div className="ui fluid input task-card__top-input">
              <input placeholder="Task Name..." onChange={this.handleChange('name')} value={this.state.name}/>
            </div>
  
            <button onClick={this.handleDeleteClick} className="circular ui icon basic button task-card__remove-button">
              Remove Task
            </button>

            <div className="circular ui icon top left pointing dropdown basic button task-card__priority-flag" ref="priorityDropdown">
              <i className={this.getPriorityFlagClass()}/>
              <div className="menu">
                <div className="item" onClick={this.handleChange('priority', 3)}>
                  <i className="task-card__priority-flag--high flag icon"/>
                </div>
                <div className="item" onClick={this.handleChange('priority', 2)}>
                  <i className="task-card__priority-flag--medium flag icon"/>
                </div>
                <div className="item" onClick={this.handleChange('priority', 1)}>
                  <i className="task-card__priority-flag--low flag icon"/>
                </div>
              </div>
            </div>
  
            <button onClick={this.props.onCloseTask} className="circular ui icon basic button task-card__close-button">
              <i className="remove icon"/>
            </button>

          </div>
          <div className="content">
            <div className="field">
              <textarea placeholder="Task Description..." onChange={this.handleChange('description')} value={this.state.description}/>
            </div>
          </div>
          <div className="extra content task-card__bottom-line">
            <div className="task-card__submit-button">
              <button type="submit" className="ui teal button" tabIndex="0" onClick={this.handleSubmit}>Save Task</button>
            </div>
  
            <div className="task-card__datepicker ui calendar inline field" ref="datepicker">
              <label>Due to: </label>
              <input onChange={this.handleChange('due_date')} value={moment(this.state.due_date).format( 'MM/DD/YYYY' )}/>
            </div>
          </div>
        </div>
      </div >
    );
  }
} );

export default TaskForm;
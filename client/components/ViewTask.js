/** client/components/ViewTask.js **/

import React from 'react';
import moment from 'moment';

const ViewTask = React.createClass({
  propTypes: {
    activeItem: React.PropTypes.object.isRequired,
    _id: React.PropTypes.string.isRequired,
    children: React.PropTypes.array,
    status: React.PropTypes.number.isRequired,
    priority: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    overdue: React.PropTypes.bool,
    name: React.PropTypes.string,
    due_date: React.PropTypes.any,

    onClick: React.PropTypes.func.isRequired,
    onAddClick: React.PropTypes.func.isRequired,
    onStatusClick: React.PropTypes.func.isRequired,
  },

  getPriorityIconClass: function getPriorityIconClass() {
    switch (this.props.priority) {
      case 1:
        return 'task__priority task__priority--low';

      case 2:
        return 'task__priority task__priority--medium';

      case 3:
        return 'task__priority task__priority--high';

      default:
        return 'task__priority';
    }
  },

  getTaskClass: function getTaskClass() {
    if (this.props._id === this.props.activeItem._id) {
      return 'ui segment task task--selected';
    }

    if (this.props.status === 2) {
      return 'ui segment task task--completed';
    }

    return 'ui segment task';
  },

  getStatusButton: function getStatusButton() {
    switch (this.props.status) {
      case 2:
        return (
          <button
            onClick={this.handleStatusButtonClick}
            className="circular mini ui icon green basic button"
          >
            <i className="minus icon" />
          </button>
        );

      default:
        return (
          <button
            onClick={this.handleStatusButtonClick}
            className="circular mini ui icon basic button"
          >
            <i className="icon" />
          </button>
        );
    }
  },

  isParent: function isParent() {
    return this.props._id === this.props.activeItem.parent_id &&
      this.props.activeItem._id === undefined;
  },

  handleStatusButtonClick: function handleStatusButtonClick(e) {
    e.stopPropagation();

    this.props.onStatusClick(this.props._id);
  },

  handleAddButtonClick: function handleAddButtonClick(e) {
    e.stopPropagation();

    this.props.onAddClick(this.props);
  },

  handleTaskClick: function handleTaskClick(e) {
    e.stopPropagation();

    this.props.onClick(this.props);
  },

  render: function render() {
    let children = this.props.children.map((task) => (
        <ViewTask
          className="child"
          onClick={this.props.onClick}
          onAddClick={this.props.onAddClick}
          onStatusClick={this.props.onStatusClick}
          activeItem={this.props.activeItem}
          key={task._id} {...task}
        />
      )
    );

    return (
      <div className={this.props.className}>
        <div className={this.getTaskClass() } onClick={this.handleTaskClick}>
          <div className="task__checkbox">
            {this.getStatusButton() }
          </div>

          <div className="task__add-button" onClick={this.handleAddButtonClick}>
            <button className="circular mini ui icon blue basic button">
              <i className="arrow down icon" />
            </button>
          </div>

          <div className="task__name">
            <strong>{this.props.name}</strong>
            {this.isParent() ? <i className="task__parent-indicator angle double down icon" /> : ''}
          </div>

          <div className="task__due-date">
            <div className={`${this.props.overdue ? 'task__due-date--overdue' : ''} ui label`}>
              <i className="calendar icon" />
              Due to {moment(this.props.due_date).format('MM/DD/YYYY') }
            </div>
          </div>

          <div className={this.getPriorityIconClass() }>
            <i className="star icon" />
          </div>
        </div>
        {children}
      </div>
    );
  },
});

export default ViewTask;

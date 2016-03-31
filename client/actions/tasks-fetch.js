/** client/actions/fetchTasks.js **/

import { FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS } from '../constants';

export const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST
  }
};

export const fetchTasksFailure = ( error ) => {
  return {
    type:  FETCH_TASKS_FAILURE,
    error: error
  }
};

export const fetchTasksSuccess = ( tasks ) => {
  return {
    type:  FETCH_TASKS_SUCCESS,
    tasks: tasks
  }
};

export function fetchTasks() {
  return ( dispatch, getState ) => {
    dispatch( fetchTasksRequest() );
    const { tasks, auth } = getState();
  
    return fetch( `http://localhost:3000/tasks?name=${tasks.filter}&sort=${tasks.sort}&token=${auth.access_token}` )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };

        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' )
          dispatch( fetchTasksSuccess( json ) );
        else
          dispatch( fetchTasksFailure( json.error ) );
      } );
  }
}
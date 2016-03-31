/** client/containers/SignupForm.js **/

import React from 'react';
import { connect } from 'react-redux';
import { authPageToggle, authAddUser } from '../actions';
import ShowSignupForm from '../components/ShowSignupForm';

const mapStateToProps = ( state ) => {
  return {
    errors:    state.auth.errors,
    isSending: state.auth.isSending
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onPageToggle: ()=> {
      dispatch( authPageToggle() );
    },
    onFormSubmit: ( data ) => {
      dispatch( authAddUser( data ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowSignupForm );
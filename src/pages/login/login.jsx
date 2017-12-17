import React, { Component } from 'react';
import { authConstants } from '../../constants'
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

class Login extends Component {
  componentDidMount() {
    const hash = this.props.location.hash;
    const regexp = /#.*=(.*)&.*=(.*)&.*=(.*)&.*=(.*)/g
    const match = regexp.exec(hash);
    const credentials = {
      accessToken: match[1],
      token_type: match[2],
      expires_in: match[3],
      state: match[4]
    }

    this.props.dispatch({
      type: authConstants.LOGIN,
      credentials
    });
    this.props.history.push('/player')
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
      </div>
    );
  }

}

const connectedLogin = withRouter(connect()(Login))
export { connectedLogin as Login }

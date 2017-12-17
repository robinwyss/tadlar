import React, { Component } from 'react';

export class Home extends Component {

  login() {
    var client_id = 'af9114318d244a4d957b854e7e124bce';
    var redirectUri = 'http://localhost:3000/callback';
    var scope = encodeURIComponent('user-read-private user-read-playback-state');
    var state = 'random';
    var url = 
    'https://accounts.spotify.com/authorize'+
    '?client_id='+ client_id +
    '&redirect_uri=' + redirectUri +
    '&scope=' + scope +
    '&response_type=token&state=' + state;
    window.location = url;
  }

  render() {
    return (
      <div>
        <button onClick={this.login}>
          <h2>Login to Spotify</h2>
        </button>
      </div>
    );
  }
}


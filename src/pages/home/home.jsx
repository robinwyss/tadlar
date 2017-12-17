import React, { Component } from 'react';

export class Home extends Component {

  login() {

  }

  render() {
    return (
      <div>
        <a href="https://accounts.spotify.com/authorize?client_id=af9114318d244a4d957b854e7e124bce&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email&response_type=token&state=random">
          <h2>Login to Spotify</h2>
        </a>
      </div>
    );
  }
}


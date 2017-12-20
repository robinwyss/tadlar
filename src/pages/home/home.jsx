import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';

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
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <div>
          <a onClick={this.login}>
            <Icon name="spotify" size="massive" />
            <h2>Login to Spotify</h2>
          </a>
        </div>
      </Grid.Column>
    </Grid>
      
    );
  }
}


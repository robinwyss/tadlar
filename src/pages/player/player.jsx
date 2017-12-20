import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blur from 'react-blur';
import { withRouter } from "react-router-dom"
import { Grid } from 'semantic-ui-react';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { active: false }
  }

  componentDidMount() {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + this.props.token);
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        throw "Unauthorized";
      }
    }).then((data) => {
      this.setState({ active: true, playing: data.is_playing, track: data.item });
    }, () => {
      this.props.history.push('/');
    });
  }

  render() {
    if (this.state.active) {
      return this.renderPlayer();
    } else {
      return this.renderIdlePlayer();
    }
  }

  renderPlayer() {
    var track = this.state.track;
    var img = track.album.images.find((element) => {
      return element.height < (window.innerHeight / 2) &&
        element.width < (window.innerWidth / 2)
    });

    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      ><Grid.Column style={{ maxWidth: 450 }}>
          <div>
            <img src={img.url} />
            <h2>{track.name}</h2>
            <h3>{this.renderArtists(track.artists)}</h3>
          </div>
        </Grid.Column>
      </Grid>
    );
  }

  renderArtists(artists) {
    return (
      <span>{artists.map((a) => a.name).join(', ')}</span>
    );
  }

  renderIdlePlayer() {
    return (
      <div>
        <h2>Nothing playing at the moment!</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.authentication.credentials.accessToken }
}

const playerWithConnect = withRouter(connect(mapStateToProps)(Player))
export { playerWithConnect as Player }
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blur from 'react-blur';
import { withRouter } from "react-router-dom"
import { Grid, Icon } from 'semantic-ui-react';
import { getCurrentlyPlaying } from '../../api/spotify'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true }
  }

  componentDidMount() {
    getCurrentlyPlaying(this.props.token).then((data) => {
      this.setState({ loading: false, active: true, playing: data.is_playing, track: data.item });
    });
  }

  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.renderPlayer()}
        </Grid.Column>
      </Grid>
    );
  }

  renderPlayer() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.active) {
      return this.renderTrack();
    } else {
      return this.renderIdlePlayer();
    }
  }

  renderLoading() {
    return (<Icon name="spinner" size="massive" rotated="clockwise"/>)
  }

  renderTrack() {
    var track = this.state.track;
    var img = track.album.images.find((element) => {
      return element.height < (window.innerHeight / 2) &&
        element.width < (window.innerWidth / 2)
    });

    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
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
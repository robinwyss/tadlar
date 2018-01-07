import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blur from 'react-blur';
import { withRouter } from "react-router-dom"
import { Grid, Icon, Progress, Segment } from 'semantic-ui-react';
import { getCurrentlyPlaying } from '../../api/spotify'
import { spotifyConstants } from '../../constants'
import _ from 'lodash'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true }
  }

  componentDidMount() {
    var self = this;
    getCurrentlyPlaying(this.props.token).then((data) => {
      self.props.dispatch({
        type: spotifyConstants.PLAYBACK_UPDATE,
        playbackInfo: data
      });
    });
  }

  componentDidUpdate() {
    if (this.state.playing) {
      setTimeout(function () {
        this.setState({ progress_ms_offset: this.state.progress_ms_offset + 500 });
      }.bind(this), 500);
    }
  }


  componentWillReceiveProps(newProps) {
    if (_.isEmpty(newProps.playbackInfo)) {
      this.setState({ loading: false });
    } else if (newProps.playbackInfo) {
      this.setState({
        loading: false,
        active: true,
        playing: this.props.playbackInfo.is_playing,
        track: this.props.playbackInfo,
        progress_ms_offset: 0
      });
    }
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.active) {
      return this.renderTrack();
    } else {
      return this.renderIdlePlayer();
    }
  }

  renderLoading() {
    return (<Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Icon name="spinner" size="massive" rotated="clockwise" />
      </Grid.Column>
    </Grid>)
  }

  renderTrack() {
    var track = this.state.track.item;
    var img = track.album.images.find((element) => {
      return element.height < (window.innerHeight / 2) &&
        element.width < (window.innerWidth / 2)
    });

    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column columns={1}>
            <div>
              <img src={img.url} />
              <h2>{track.name}</h2>
              <h3>{this.renderArtists(track.artists)}</h3>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column style={{ width: '100%' }}>
            {this.renderTrackStatus(track)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderArtists(artists) {
    return (
      <span>{artists.map((a) => a.name).join(', ')}</span>
    );
  }

  renderTrackStatus(track) {
    var progress = ((this.state.track.progress_ms + this.state.progress_ms_offset) / this.state.track.item.duration_ms) * 100;

    return (<Segment>
      <Progress percent={progress} attached='top' />
      <Icon name={this.state.playing ? 'play' : 'pause'} size="large" />
      <Progress percent={progress} attached='bottom' />
    </Segment>)
  }

  renderIdlePlayer() {
    return (<Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <h2>Nothing playing at the moment!</h2>
      </Grid.Column>
    </Grid>)
  }
}

function mapStateToProps(state) {
  var playbackInfo = state.spotify ? state.spotify.playbackInfo : undefined;
  return {
    token: state.authentication.credentials.accessToken,
    playbackInfo
  }
}

const playerWithConnect = withRouter(connect(mapStateToProps)(Player))
export { playerWithConnect as Player }
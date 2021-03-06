import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Blur from 'react-blur';
import { withRouter } from "react-router-dom"
import { Grid, Loader } from 'semantic-ui-react';
import { getCurrentlyPlaying } from '../../api/spotify'
import { spotifyConstants } from '../../constants'
import _ from 'lodash'
import { spotifyActions } from '../../actions'
import { Track, TrackStatus } from './components'
import { ArtistInfo } from './components/artistInfo'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true }
  }

  componentDidMount() {
    this.updateCurrentlyPlaying();
    this.updateInterval = setInterval(this.updateCurrentlyPlaying.bind(this), 5000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.updateInterval)
  // }

  componentWillReceiveProps(newProps) {
    // clearInterval(this.progressInterval);
    if (_.isEmpty(newProps.playbackInfo)) {
      this.setState({ loading: false });
    } else if (newProps.playbackInfo) {
      this.setState({
        loading: false,
        active: true,
        playing: newProps.playbackInfo.is_playing,
        track: newProps.playbackInfo
        // progress_ms_offset: 0
      });

      // if (newProps.playbackInfo.is_playing) {
      //   this.progressInterval = setInterval(function () {
      //     this.setState({ progress_ms_offset: this.state.progress_ms_offset + 500 });
      //   }.bind(this), 500);
      // }
    }
  }

  updateCurrentlyPlaying() {
    var self = this;
    getCurrentlyPlaying(this.props.token).then((data) => {
      this.props.updatePlaybackStatus(data);
    });
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
        <Loader />
      </Grid.Column>
    </Grid>)
  }

  renderTrack() {
    var trackItem = this.state.track.item;
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column >
                  <Track track={this.state.track.item} />
                </Grid.Column>
                <Grid.Column>
                  <ArtistInfo name={trackItem.artists[0].name} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TrackStatus track={this.state.track} playing={this.state.playing} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updatePlaybackStatus: spotifyActions.updatePlaybackStatus
  }, dispatch);
}

const playerWithConnect = withRouter(connect(mapStateToProps, mapDispatchToProps)(Player))
export { playerWithConnect as Player }
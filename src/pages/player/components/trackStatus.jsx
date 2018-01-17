import React, { Component } from 'react';
import { Grid, Icon, Progress } from 'semantic-ui-react';

export class TrackStatus extends Component {

    render() {
        var trackItem = this.props.track.item;
        var progress = ((this.props.track.progress_ms + this.props.progress_ms_offset) / trackItem.duration_ms) * 100;

        return (<Grid.Row columns={1}>
            {this.renderPlaybackStatus()}
            <Grid.Column style={{ width: '100%' }}>
                <Progress percent={progress} active={this.props.playing} size="small" />
            </Grid.Column>
        </Grid.Row>)
    }

    renderPlaybackStatus() {
        if (this.props.playing) {
            return null;
        }
        return (
            <Grid.Column style={{ width: '100%' }}>
                <Icon name="pause" size="large" />
            </Grid.Column>
        );
    }

}
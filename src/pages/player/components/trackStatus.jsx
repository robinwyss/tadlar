import React, { Component } from 'react';
import { Grid, Icon, Progress } from 'semantic-ui-react';

export class TrackStatus extends Component {

    constructor(props) {
        super(props);
        this.state = { progress_ms_offset: 0 };
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
    }

    componentWillReceiveProps(newProps) {
        clearInterval(this.progressInterval);
        if (newProps.track.item != this.props.track.item.id) {
            this.setState({ progress_ms_offset: 0 })
        }
        if (newProps.playing) {
            this.progressInterval = setInterval(function () {
                this.setState({ progress_ms_offset: this.state.progress_ms_offset + 100 });
            }.bind(this), 100);
        }
    }

    render() {
        var trackItem = this.props.track.item;
        var progress = ((this.props.track.progress_ms + this.state.progress_ms_offset) / trackItem.duration_ms) * 100;

        return (<Grid verticalAlign='middle'>
            <Grid.Row columns={1}>
                <Grid.Column style={{ width: '100%', padding: '20px 0px' }}>
                    {this.renderPlaybackStatus()}
                </Grid.Column>
                <Grid.Column style={{ width: '100%' }}>
                    <Progress percent={progress} active={this.props.playing} size="small" />
                </Grid.Column>
            </Grid.Row>
        </Grid>)
    }

    renderPlaybackStatus() {
        if (this.props.playing) {
            return null;
        }
        return (
            <Icon name="pause" size="large" />
        );
    }

}
import React, { Component } from 'react';

export class Track extends Component {

    render() {
        var trackItem = this.props.track;
        var img = trackItem.album.images.find((element) => {
            return element.height < (window.innerHeight / 2) &&
                element.width < (window.innerWidth / 2)
        });

        return (
            <div>
                <img src={img.url} />
                <h2>{trackItem.name}</h2>
                <h3>{this.renderArtists(trackItem.artists)}</h3>
            </div>
        );
    }

    renderArtists(artists) {
        return (
            <span>{artists.map((a) => a.name).join(', ')}</span>
        );
    }
}
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export class Relations extends Component {

    render() {
        return this.renderLinks(this.props.relations)
    }

    renderLinks(relations) {
        if (!relations) {
            return null;
        }
        return (
            <div>{relations.map(rel => {
                switch (rel.type) {
                    case "official homepage": return this.renderIcon('home', rel);
                    case "soundcloud": return this.renderIcon('soundcloud', rel);
                    case "wikipedia": return this.renderIcon('wikipedia', rel);
                    case "youtube play": return this.renderIcon('youtube play', rel);
                    case "streaming music": return this.renderStreamingMusic(rel);
                    case "social network": return this.renderSocialNetworkUrl(rel);
                }
            })}</div>)
    }

    renderSocialNetworkUrl(relation) {
        if (relation.url.resource.includes('twitter.com')) {
            return this.renderIcon('twitter', relation);
        } else if (relation.url.resource.includes('facebook.com')) {
            return this.renderIcon('facebook', relation);
        } if (relation.url.resource.includes('instagram.com')) {
            return this.renderIcon('instagram', relation);
        }
        return null
    }

    renderStreamingMusic(relation) {
        if (relation.url.resource.includes('spotify.com')) {
            return this.renderIcon('spotify', relation);
        }
        return null
    }

    renderIcon(name, rel) {
        return (<a href={rel.url.resource} target="_blank" key={rel.url.resource} ><Icon name={name} size="large" /></a>)
    }
}
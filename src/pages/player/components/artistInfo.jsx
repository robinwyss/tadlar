import React, { Component } from 'react';
import { searchArtist, getArea } from '../../../api/musicbrainz'
import _ from 'lodash'
import { Icon } from 'semantic-ui-react';

export class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.updateArtistInfo()
    }

    componentWillReceiveProps(newProps) {
        if (this.props.name != newProps.name) {
            this.updateArtistInfo()
        }
    }

    updateArtistInfo() {
        this.setState({ loading: true });
        searchArtist(this.props.name).then(artistData => {
            this.setState({ artistData, loading: true });
            if (artistData.exactMatch) {
                if (artistData.artist.area) {
                    getArea(artistData.artist.area.id).then((area) => {
                        this.setState({ area });
                    });
                }
                if (artistData.artist.begin_area) {
                    getArea(artistData.artist.begin_area.id).then((beginArea) => {
                        this.setState({ beginArea });
                    });
                }
            }
        });

    }

    render() {
        if (!this.state.loading) {
            return (<div> loading </div>);
        } else if (_.isEmpty(this.state.artistData)) {
            return (<div> no info found </div>);
        }
        return (
            <div>
                <div>
                    {this.state.artistData.artist.name}
                </div>
                <div>
                    {this.renderArea(this.state.area, this.state.beginArea)}
                </div>
                <div>
                    {this.renderLinks(this.state.artistData.artist.relations)}
                </div>
            </div>
        );
    }

    renderArea(area, beginArea) {
        if (!area && !beginArea) {
            return null;
        }
        var country = _.get(area, 'Country', '');
        var beginAreaPlaces = [
            _.get(beginArea, 'City'),
            _.get(beginArea, 'Subdivision'),
            _.get(beginArea, 'Country')
        ].filter(e => e); //removed undefined values
        var beginArea = _.join(beginArea, ', ');
        if (!country) {
            return (<div>beginArea</div>)
        } else if (!beginArea) {
            return (<div>{country}</div>)
        } else {
            return (<div>
                {country} ({beginArea})
       </div>)
        }
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
        return (<a href={rel.url.resource} key={rel.url.resource} ><Icon name={name} size="large" /></a>)
    }
}
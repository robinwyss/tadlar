import React, { Component } from 'react';
import { searchArtist, getArea } from '../../../api/musicbrainz'
import _ from 'lodash'
import { Icon } from 'semantic-ui-react';
import { Relations } from './relations';
import { Area } from './area';
import { WikipediaBio } from './wikipediaBio';

export class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.updateArtistInfo(this.props.name)
    }

    componentWillReceiveProps(newProps) {
        if (this.props.name != newProps.name) {
            this.updateArtistInfo(newProps.name)
        }
    }

    updateArtistInfo(name) {
        this.setState({ loading: true });
        searchArtist(name).then(artistData => {
            this.setState({ artistData, loading: false });
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
        if (this.state.loading) {
            return (<div> loading </div>);
        } else if (!this.state.artistData || _.isEmpty(this.state.artistData)) {
            return (<div> no info found </div>);
        }
        if (this.state.artistData.exactMatch) {
            return (
                <div>
                    <div>
                        {this.state.artistData.artist.name}
                    </div>
                    <div>
                        <Area area={this.state.area} beginarea={this.state.beginArea} />
                    </div>
                    <div>
                        <Relations relations={this.state.artistData.artist.relations} />
                    </div>
                    <div>
                        <WikipediaBio relations={this.state.artistData.artist.relations} />
                    </div>
                </div>
            );
        } else {
            return (<div>multiple matches</div>)
        }
    }

    

}
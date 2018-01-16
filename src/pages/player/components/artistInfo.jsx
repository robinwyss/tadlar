import React, { Component } from 'react';
import { searchArtist, getArea } from '../../../api/musicbrainz'
import _ from 'lodash'

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
                    {this.renderArea()}
                </div>
            </div>
        );
    }

    renderArea() {
        if (!this.state.area && !this.state.beginArea) {
            return null;
        }
        var country = _.get(this, 'state.area.Country', '');
        var beginAreaPlaces = [
            _.get(this, 'state.beginArea.City'),
            _.get(this, 'state.beginArea.Subdivision'),
            _.get(this, 'state.beginArea.Country')
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
}
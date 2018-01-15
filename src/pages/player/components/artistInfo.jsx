import React, { Component } from 'react';
import { searchArtist, getArea } from '../../../api/musicbrainz'
import _ from 'lodash'

export class ArtistInfo extends Component {

    componentDidMount() {
        searchArtist(this.props.name).then(artistData => {
            this.setState({ artistData });
            if (artistData.exactMatch) {
                getArea(artistData.artist.area.id).then((area) => {
                    this.setState({ area });
                });
                getArea(artistData.artist.begin_area.id).then((beginArea) => {
                    this.setState({ beginArea });
                });
            }
        });


    }

    render() {
        if (!this.state || !this.state.artistData) {
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
        var country = _.get(this, 'state.area.Country', '');
        var beginCity = _.get(this, 'state.beginArea.City', '');
        var beginSubdivision = _.get(this, 'state.beginArea.Subdivision', '');
        var beginCountry =  _.get(this, 'state.beginArea.Country', '');

        return (
            <div>
                {country} ({beginCity}, {beginSubdivision}, {beginCountry})
            </div>
        )
    }
}
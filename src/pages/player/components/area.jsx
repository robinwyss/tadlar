import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export class Area extends Component {

    render() {
        if (!this.props.area && !this.props.beginArea) {
            return null;
        }
        return (<div>
            <Icon name='globe' />
            {this.renderArea(this.props.area, this.props.beginArea)}
        </div>);
    }

    renderArea(area, beginArea) {
        var combinedArea = this.combineArea(area);
        var combineBeginArea = this.combineArea(beginArea);

        if (!combinedArea) {
            return combineBeginArea
        } else if (!combineBeginArea) {
            return combinedArea
        } else {
            return combinedArea + ' (' +combineBeginArea +')';
        }
    }

    combineArea(area) {
        var areaArray = [
            _.get(area, 'City'),
            _.get(area, 'Subdivision'),
            _.get(area, 'Country')
        ].filter(e => e); //removed undefined values
        return _.join(areaArray, ', ');
    }
}
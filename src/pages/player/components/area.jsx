import React, { Component } from 'react';

export class Area extends Component {
    render(){
        return this.renderArea(this.props.area, this.props.beginArea);
    }

    renderArea(area, beginArea) {
        if (!area && !beginArea) {
            return null;
        }
        // var country = _.get(area, 'Country', '');
        var combinedArea = this.combineArea(area);
        var combineBeginArea = this.combineArea(beginArea);
        if (!combinedArea) {
            return (<div>combineBeginArea</div>)
        } else if (!combineBeginArea) {
            return (<div>{combinedArea}</div>)
        } else {
            return (<div>
                {combinedArea} ({combineBeginArea})
       </div>)
        }
    }

    combineArea(area){
        var areaArray = [
            _.get(area, 'City'),
            _.get(area, 'Subdivision'),
            _.get(area, 'Country')
        ].filter(e => e); //removed undefined values
        return _.join(areaArray, ', ');
    }
}
import React, { Component } from 'react';
import { getAbstract } from '../../../api/wikipedia'
import _ from 'lodash'

export class WikipediaBio extends Component {

    componentDidMount() {
        this.loadAbstract(this.props.relations);
    }

    componentWillReceiveProps(newProps) {
        if (this.relationsChanged(newProps.relations)){
            this.loadAbstract(newProps.relations);
        }
    }

    loadAbstract(relations) {
        var wikipediaRelation = this.findWikipediaRelation(relations)
        if (wikipediaRelation) {
            getAbstract(wikipediaRelation.url.resource).then(result => {
                this.setState({ wikiData: result.query.pages })
            });
        }
    }

    render() {
        if (_.get(this, 'state.wikiData')) {
            var key = _.findKey(this.state.wikiData);
            return (
                <div dangerouslySetInnerHTML={{__html: this.state.wikiData[key].extract}} />
            );
        }
        return null;
    }

    findWikipediaRelation(relations) {
        if (relations) {
            return relations.find(relation => {
                return relation.type === 'wikipedia'
            });
        }
    }

    relationsChanged(relations) {
        return !_.isEqual(relations, this.props.relations);
    }
}
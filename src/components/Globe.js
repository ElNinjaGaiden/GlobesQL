import React from 'react';
import $ from 'jquery';
import { deepPurple500, cyan500, red500 } from 'material-ui/styles/colors';
import { deleteGlobeMutation, globesQuery } from '../data/Globes';
import { graphql } from 'react-apollo';

export const globesColors = [red500, cyan500, deepPurple500];
const speeds = [1900, 800, 300];

class Globe extends React.Component {

    componentDidMount() {
        this.animate();
    }

    onClick = () => {
        const { globe, mutate } = this.props;
        mutate({
            variables: {
                id: globe.id
            },
            optimisticResponse: {
                deleteGlobe: {
                    __typename: 'Globe',
                    id: globe.id,
                    type: globe.type
                }
            },
            update: (store, { data: { deleteGlobe } }) => {
                if(typeof deleteGlobe === 'undefined') return;
                // Read the data from the cache for this query.
                const data = store.readQuery({query: globesQuery });
                const globeIndex = data.globes.findIndex((g) => {
                    console.log(g, deleteGlobe, typeof deleteGlobe, !deleteGlobe);
                    return g.id === deleteGlobe.id;
                });
                if (globeIndex > -1) {
                    data.globes.splice(globeIndex, 1);
                    // Write the data back to the cache.
                    store.writeQuery({ query: globesQuery, data });
                    if(typeof this.props.onDelete === 'function') {
                        this.props.onDelete(globe);
                    }
                }
            },
            //refetchQueries: [ { query: globesQuery } ]
        });
    }

    render = () => {
        const newq = this.makeNewPosition();
        const { globe, index } = this.props;
        const style = {
            zIndex:index,
            top: newq[0],
            left: newq[1],
            backgroundColor: globesColors[globe.type - 1]
        };
        return  <div className={'globe'} onClick={this.onClick.bind(this)}
                    ref={g => this._gl = g}
                    style={style}>
                </div>
    }

    animate = () => {
        const { globe } = this.props;
        const speed = speeds[globe.type - 1];
        const newq = this.makeNewPosition();
        $(this._gl).animate({ top: newq[0], left: newq[1] }, speed, () => { this.animate(); });
    }

    makeNewPosition = () => {
        const h = $(window).height() - 50;
        const w = $(window).width() - 50;
        const nh = Math.floor(Math.random() * h);
        const nw = Math.floor(Math.random() * w);
        return [nh,nw];
    }
}

export default graphql(deleteGlobeMutation)(Globe);
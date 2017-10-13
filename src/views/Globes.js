import React from 'react';
import { graphql } from 'react-apollo';
import { globesQuery, globeAddedSubscription, globeDeletedSubscription, newPlayerSubscription, globesClearedSubscription } from '../data/Globes';
import Globe, { globesColors } from '../components/Globe';
import NewGlobeButton from '../components/NewGlobeButton';
import UserInfo from '../components/UserInfo';

class GlobesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            creditsGlobes1: 0,
            creditsGlobes2: 0,
            creditsGlobes3: 0
        };
    }

    componentWillMount() {
        this.props.data.subscribeToMore({
            document: newPlayerSubscription,
            variables: {},
            updateQuery: (prev, {subscriptionData}) => {
                console.log('newPlayerSubscription', subscriptionData);
                if (!subscriptionData.data) {
                    return prev;
                }
                const newGlobes = [];
                subscriptionData.data.newPlayer.forEach(g => {
                    if(!prev.globes.find((_g) => _g.id === g.id)) {
                        newGlobes.push(g);
                    }
                });
                // don't add existing globes
                if (newGlobes.length) {
                    return Object.assign({}, prev, {
                        globes: [...prev.globes, ...newGlobes]
                    });
                } 
                else {
                    return prev;
                }
            }
        });

        this.props.data.subscribeToMore({
            document: globesClearedSubscription,
            variables: {},
            updateQuery: (prev, {subscriptionData}) => {
                console.log('globesClearedSubscription', subscriptionData);
                if (!subscriptionData.data) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    globes: []
                });
            }
        });

        this.props.data.subscribeToMore({
            document: globeAddedSubscription,
            variables: {},
            updateQuery: (prev, {subscriptionData}) => {
                console.log('globeAddedSubscription', subscriptionData);
                if (!subscriptionData.data) {
                    return prev;
                }
                const newGlobe = subscriptionData.data.globeAdded;
                // don't add an existing globe
                if (!prev.globes.find((g) => g.id === newGlobe.id)) {
                    return Object.assign({}, prev, {
                        globes: [...prev.globes, newGlobe]
                    });
                } 
                else {
                    return prev;
                }
            }
        });

        this.props.data.subscribeToMore({
            document: globeDeletedSubscription,
            variables: {},
            updateQuery: (prev, {subscriptionData}) => {
                console.log('globeDeletedSubscription', subscriptionData);
                if (!subscriptionData.data) {
                    return prev;
                }
                const globeDeleted = subscriptionData.data.globeDeleted;
                return Object.assign({}, prev, {
                    globes: prev.globes.filter(g => g.id !== globeDeleted.id)
                });
            }
        });
    }
    
    render = () => {
        const { data } = this.props;
        if (data.loading) {
            return <p>Loading ...</p>;
        }
        if (data.error) {
            return <p>{data.error.message}</p>;
        }
        return <div className={'globes-container'}>
                <UserInfo />
                <NewGlobeButton style={{top:20}} 
                                disabled={this.state.creditsGlobes1 <= 0} 
                                disabledColor={globesColors[0]} type={1}
                                backgroundColor={globesColors[0]}
                                onAdd={this.onGlobeAdded.bind(this)} />

                <NewGlobeButton style={{top:100}} 
                                disabled={this.state.creditsGlobes2 <= 0} 
                                disabledColor={globesColors[1]} type={2}
                                backgroundColor={globesColors[1]}
                                onAdd={this.onGlobeAdded.bind(this)} />

                <NewGlobeButton style={{top:180}} 
                                disabled={this.state.creditsGlobes3 <= 0} 
                                disabledColor={globesColors[2]} type={3}
                                backgroundColor={globesColors[2]}
                                onAdd={this.onGlobeAdded.bind(this)} />
                {
                    data.globes.map((g, index) => 
                        <Globe key={g.id} index={index} globe={g} onDelete={this.onGlobeDeleted.bind(this)} />
                    )
                }
                </div>
    }

    onGlobeDeleted = (globe) => {
        switch(globe.type) {
            case 1:
                this.setState({creditsGlobes1: this.state.creditsGlobes1 + 1 });
                break;

            case 2:
                this.setState({creditsGlobes2: this.state.creditsGlobes2 + 1 });
                break;

            case 3:
                this.setState({creditsGlobes3: this.state.creditsGlobes3 + 1 });
                break;

            default:
                break;
        }
    }

    onGlobeAdded = (globe) => {
        switch(globe.type) {
            case 1:
                this.setState({creditsGlobes1: this.state.creditsGlobes1 - 1 });
                break;

            case 2:
                this.setState({creditsGlobes2: this.state.creditsGlobes2 - 1 });
                break;

            case 3:
                this.setState({creditsGlobes3: this.state.creditsGlobes3 - 1 });
                break;

            default:
                break;
        }
    }
}
 
export default graphql(globesQuery)(GlobesView);
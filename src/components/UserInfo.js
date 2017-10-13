import React from 'react';
import { graphql } from 'react-apollo';
import { newPlayerMutation, globesQuery } from '../data/Globes';

class UserInfo extends React.Component {

    componentWillMount = () => {
        const { mutate } = this.props;
        mutate({
            variables: {},
            refetchQueries: [ { query: globesQuery } ]
        }).then(res => {

        });
    }

    render = () => {
        return <div style={{display: 'nonen'}}></div>
    }
}

export default graphql(newPlayerMutation)(UserInfo);
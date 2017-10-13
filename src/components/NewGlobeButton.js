import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { graphql } from 'react-apollo';
import { globesQuery, addGlobeMutation } from '../data/Globes';

const _style ={
    addButton: {
        position: 'absolute',
        right: 20,
        zIndex: 10000
    }
};

const AddGlobeButton = ({ mutate, onAdd, style, disabled, disabledColor, type, backgroundColor }) => {

    const onClick = () => {
        mutate({
            variables: {
                type: type
            },
            optimisticResponse: {
                addGlobe: {
                    __typename: 'Globe',
                    id: 0,
                    type: type
                }
            },
            update: (store, { data: { addGlobe } }) => {
                if(typeof addGlobe === 'undefined') return;
                // Read the data from the cache for this query.
                const data = store.readQuery({query: globesQuery });
                if (!data.globes.find((g) => g.id === addGlobe.id)) {
                    data.globes.push(addGlobe);
                    // Write the data back to the cache.
                    store.writeQuery({ query: globesQuery, data });
                    if(typeof onAdd === 'function') {
                        onAdd(addGlobe);
                    }
                }
            },
            refetchQueries: [ { query: globesQuery } ]
        });
    }

    return  <FloatingActionButton style={Object.assign({}, _style.addButton, style)} 
                                    backgroundColor={backgroundColor}
                                    onClick={onClick} 
                                    disabled={disabled} 
                                    disabledColor={disabledColor}>
                <ContentAdd />
            </FloatingActionButton>
}

export default graphql(addGlobeMutation)(AddGlobeButton);
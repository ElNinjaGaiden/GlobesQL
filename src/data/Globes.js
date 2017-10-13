import { gql } from 'react-apollo';

export const globesQuery = gql`
query globesQuery {
    globes {
        id
        type
    }
}
`;

export const addGlobeMutation = gql`
mutation addGlobe($type:Int!) {
    addGlobe(type:$type) {
        id
        type
    }
}
`;

export const globeAddedSubscription = gql`
subscription globeAdded {
    globeAdded {
        id
        type
    }
}
`;

export const deleteGlobeMutation = gql`
mutation deleteGlobe($id:Int!) {
    deleteGlobe(id:$id) {
        id
        type
    }
}
`;

export const globeDeletedSubscription = gql`
subscription globeDeleted {
    globeDeleted {
        id
        type
    }
}
`;

export const newPlayerMutation = gql`
mutation newPlayer {
    newPlayer {
        id
        type
    }
}
`;

export const newPlayerSubscription = gql`
subscription newPlayer {
    newPlayer {
        id
        type
    }
}
`;

export const globesClearedSubscription = gql`
subscription globesCleared {
    globesCleared {
        id
        type
    }
}
`;
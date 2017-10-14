//export const graphUri = 'https://globesqlserver.herokuapp.com/graphql';
//export const wsConnectionUrl = 'wss://globesqlserver.herokuapp.com/subscriptions';
//export const graphUri = 'http://localhost:4000/graphql';
//export const wsConnectionUrl = 'ws://localhost:4000/subscriptions';
export const graphUri = process.env.NODE_ENV === 'production' ? 'https://globesqlserver.herokuapp.com/graphql' : 'http://localhost:4000/graphql';
export const wsConnectionUrl = process.env.NODE_ENV === 'production' ? 'wss://globesqlserver.herokuapp.com/subscriptions' : 'ws://localhost:4000/subscriptions';
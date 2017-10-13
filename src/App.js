import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { graphUri } from './config';
import GlobesView from './views/Globes';
import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
//import AppBarComponent from './components/AppBar';

const networkInterface = createNetworkInterface({ 
  uri: graphUri
});

//console.log(process.env.NODE_ENV);
//console.log('Check this diego: ' + graphUri);

const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
  reconnect: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div className="App">
              {/* <AppBarComponent /> */}
              <Switch>
                <Route exact path="/" component={GlobesView}/>
                <Route component={ NotFound }/>
              </Switch>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;

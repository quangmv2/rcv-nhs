import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import AuthProvider from "./store";
import { RouterRoot } from './router';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';


// const httpLink = createHttpLink({
//   uri: 'http://34.68.141.112/graphql',
// });

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4200/graphql',
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = new HttpLink({
  uri: '/graphql'
});

const wsLink = new WebSocketLink({
  uri: '/graphql',
  options: {
    reconnect: true,
    connectionParams: () => ({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});
// const client = new ApolloClient({
//   uri: 'http://34.68.141.112/graphql',
//   cache: new InMemoryCache()
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterRoot />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

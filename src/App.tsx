import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import AuthProvider from "./store";
import { RouterRoot } from './router';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// const httpLink = createHttpLink({
//   uri: 'http://34.68.141.112/graphql',
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:4200/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

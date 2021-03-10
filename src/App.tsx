import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import AuthProvider from "./store";
import { RouterRoot } from './router';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://34.68.141.112:4200/graphql',
  cache: new InMemoryCache()
});

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

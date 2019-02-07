import React from 'react';
import { Root } from 'native-base';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './lib/apolloClient';
import AppNavigator from './navigation';
import AlertContainer from './components/AlertContainer';

export default () => (
  <ApolloProvider client={apolloClient}>
    <Root>
      <AppNavigator />
      <AlertContainer
        ref={node => {
          if (!AlertContainer.alertInstance)
            AlertContainer.alertInstance = node;
        }}
      />
    </Root>
  </ApolloProvider>
);

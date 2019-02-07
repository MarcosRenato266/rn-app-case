import { createUploadLink } from 'apollo-upload-client';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TOKEN_KEY } from '../utils/Constants';
import { graphqlUrl } from './config';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createUploadLink({
  uri: graphqlUrl,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

console.disableYellowBox = true;

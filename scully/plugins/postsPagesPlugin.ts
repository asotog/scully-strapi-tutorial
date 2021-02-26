import {
  ApolloClient,
  ApolloLink,
  concat,
  gql,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import fetch from 'node-fetch';
import {
  HandledRoute,
  registerPlugin
} from '@scullyio/scully';
import {
  ENV
} from '../../env';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${ENV.GRAPHQL_API_TOKEN}`,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: ENV.GRAPHQL_API_URL,
      fetch,
    })
  ),
  cache: new InMemoryCache(),
});

registerPlugin(
  'router',
  'postsPagesPlugin',
  async (route: string, config = {}): Promise < HandledRoute[] > => {
    const {
      data: {
        blogSamples
      },
    } = await client.query({
      query: gql `
        query BlogSamplesQuery {
          blogSamples {
            id
            Title
          }
        }
      `,
    });
    console.log(blogSamples)
    return Promise.resolve(
      blogSamples.map((blog) => ({
        route: `/p/${blog.id}`
      }))
    );
  }
);
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

let client

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient()
  }
  return client
}

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
  })
}

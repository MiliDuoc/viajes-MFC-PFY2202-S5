import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "@apollo/client"

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${import.meta.env.BASE_URL}graphql`
  }),
  cache: new InMemoryCache()
})

export default apolloClient

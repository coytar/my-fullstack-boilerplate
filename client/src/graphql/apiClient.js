import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const token = JSON.parse(localStorage.getItem("token"));

  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      Authorization: token,
    },
  }));

  return forward(operation);
});
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND}/graphql`,
});

const apiClient = new ApolloClient({
  // link: [errorLink, authLink, httpLink],
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apiClient;

import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://127.0.0.1:8000/graphql/",  // django db url
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

if (!rootElement) {
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
}

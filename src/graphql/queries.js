import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    allProducts {
      name
      type
      sku
      quantity
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($sku: String!) {
    getProduct(sku: $sku) {
      name
      type
      sku
      quantity
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $type: String!, $sku: String!, $quantity: Int!) {
    createProduct(name: $name, type: $type, sku: $sku, quantity: $quantity) {
      name
      type
      sku
      quantity
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($sku: String!, $name: String!, $type: String!, $quantity: Int!) {
    updateProduct(sku: $sku, name: $name, type: $type, quantity: $quantity) {
      name
      type
      sku
      quantity
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($sku: String!) {
    deleteProduct(sku: $sku)
  }
`;

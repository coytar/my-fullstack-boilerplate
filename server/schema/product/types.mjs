import gql from "graphql-tag";

export const ProductTypes = gql`
  type Product {
    _id: String
    model: String,
    description: String,
    price: Float,
    category: String,
    manufacturer: String,
    supplier: String,
    originCountry: String  
  }

  type Query {
    products: [Product],
    getProduct (_id: String!): Product
  }

  type Mutation {
    addProduct(description: String!): Product
    updateProduct(_id: String!, description: String): Product
  }
`;

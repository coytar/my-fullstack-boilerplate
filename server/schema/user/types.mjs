import gql from "graphql-tag";

export const UserTypes = gql`
  type QueryUserResult {
    data: [User]
    count: Int
    nextPage: Boolean 
  }

  type User {
    _id: String
    description: String!
    completed: Boolean
    username: String!
    password: String!
    email: String!
    profilePic: String
    firstName: String
    lastName: String
    bio: String
    createdAt: Int
    updatedAt: Int
    role: String
    organisation: String
  }

  type Query {
    users (page: Int!, pageSize: Int!): QueryUserResult,
    getUser (_id: String!): User
  }

  type Mutation {
    addUser(description: String!): User
    updateUser(_id: String!, firstName: String, lastName: String): User
    deleteUser(_id: String!): Boolean
    deleteUsers(list: [String]!): Int
  }
`;

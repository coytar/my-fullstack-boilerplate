import gql from "graphql-tag";

export const TaskTypes = gql`
  type QueryTaskResult {
    data: [Task]
    count: Int
    nextPage: Boolean 
  }

  type Task {
    _id: String
    description: String!
    completed: Boolean
  }

  type Query {
    tasks (page: Int!, pageSize: Int!): QueryTaskResult,
    getTask (_id: String!): Task
  }

  type Mutation {
    addTask(description: String!): Task
    updateTask(_id: String!, description: String, completed: Boolean): Task
    deleteTask(_id: String!): Boolean
    deleteTasks(list: [String]!): Int
  }
`;

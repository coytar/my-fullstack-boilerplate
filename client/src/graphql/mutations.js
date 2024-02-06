import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation addTask($desc: String!) {
    addTask(description: $desc) {
      _id
      description
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id)
  }
`;

export const DELETE_TASKS = gql`
  mutation deleteTasks($items: [String]!) {
    deleteTasks(list: $items)
  }
`;

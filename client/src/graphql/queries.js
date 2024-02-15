import { gql } from "@apollo/client";

export const LIST_TASKS = gql`
  query tasks($page: Int!, $pageSize: Int!) {
    tasks(page: $page, pageSize: $pageSize) {
      data {
        _id
        completed
        description
        organisation
      }
      count
      nextPage
    }
  }
`;

export const GET_TASK = gql`
  query getTask($id: String!) {
    getTask(_id: $id) {
      _id
      description
      completed
      organisation
    }
  }
`;
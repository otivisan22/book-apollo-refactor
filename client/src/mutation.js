import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($addUserInput: AddUserInput!) {
    addUser(input: $addUserInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation($saveBookInput: SaveBookInput!) {
    saveBook(input: $saveBookInput) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

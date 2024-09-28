import { gql } from '@apollo/client';

const BOOK_INFO = gql`
  fragment BookInfo on Book {
    title
    published
    author {
      name
    }
    genres
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookInfo
    }
  }
  ${BOOK_INFO}
`;

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookInfo
    }
  }
  ${BOOK_INFO}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_USER = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookInfo
    }
  }
  ${BOOK_INFO}
`;

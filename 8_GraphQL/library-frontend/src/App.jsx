import { useState } from "react";
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [userInfo, setUserInfo] = useState(null);

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setUserInfo(null)
  }

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  console.log("local", localStorage)
  console.log("token", token)


  if (!token) {
    return (
      <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors authors = {authors.data.allAuthors} show={page === "authors" } />

      <Books show={page === "books"} books = {books.data.allBooks} token = {token} userInfo={userInfo} />

      <LoginForm show={page === "login"} setToken={setToken} setUserInfo={setUserInfo}/>
    </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors authors = {authors.data.allAuthors} show={page === "authors" } />

      <Books books = {books.data.allBooks} show={page === "books"} token = {token} userInfo={userInfo}/>

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;

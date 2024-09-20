import { useState, useEffect } from "react";
import { ALL_BOOKS, GET_USER } from '../queries';
import { useQuery } from '@apollo/client';

const Books = ({ show, token, userInfo }) => {
  const [filter, setFilter] = useState('');
  const allBooksQuery = useQuery(ALL_BOOKS)
  const filteredBooksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: filter || null},
  });

  console.log("filter", filter)
  console.log("user", userInfo)

  useEffect(() => {
    if (token && userInfo) {
      setFilter(userInfo.favoriteGenre); 
    }
  }, [token, userInfo]);

  if (!show) {
    return null;
  }

  if (allBooksQuery.loading) {
    return <div>Loading...</div>;
  }

  const all_books = allBooksQuery.data ? allBooksQuery.data.allBooks : []

  const handleFilterChange = (genre) => {
    setFilter(genre);
  };

  const filteredBooks = filteredBooksQuery.data ? filteredBooksQuery.data.allBooks : []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!token && (
        <div>
          <h3>Filter by genre</h3>
          {Array.from(new Set(all_books.flatMap((book) => book.genres))).map(
            (genre) => (
              <button key={genre} onClick={() => handleFilterChange(genre)}>
                {genre}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Books;

import React from 'react';

const VerseSelect = ({ books }) => {
  const bookList = books.map((book) => {
    return (
      <option key={book.id} value={book.name}>
        {book.name}
      </option>
    );
  });

  if (books.length === 0) {
    return;
  }

  return (
    <div>
      <p>Choose a verse:</p>
      <form>
        <label htmlFor="books">Books</label>
        <select name="books" id="books">
          {bookList}
        </select>
      </form>
    </div>
  );
};

export default VerseSelect;

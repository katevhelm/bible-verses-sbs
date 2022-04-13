import React from 'react';

const VerseSelect = (props) => {
  return (
    <div>
      <p>Choose a verse:</p>
      <form>
        <label htmlFor="books">Books</label>
        <select name="books" id="books">
          <option value="genesis">Genesis</option>
          <option value="exodus">Exodus</option>
        </select>
      </form>
    </div>
  );
};

export default VerseSelect;

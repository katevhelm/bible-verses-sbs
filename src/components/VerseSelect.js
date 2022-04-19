import React from 'react';
import Dropdown from './Dropdown';

class VerseSelect extends React.Component {
  state = { bookSelected: '' };

  // function instead of variable to be called again when re-render
  bookList = () =>
    this.props.books.map((book) => {
      return (
        <option key={book.id} value={book.name}>
          {book.name}
        </option>
      );
    });

  onBookSelected = (e) => {
    // setState is asynchronous function
    this.setState({ bookSelected: e.target.value }, () =>
      console.log(this.state.bookSelected)
    );
  };

  render() {
    if (this.props.books.length === 0) {
      return;
    }
    return (
      <div>
        <h3>Choose a verse:</h3>
        <form>
          <Dropdown
            options={this.props.books}
            optionsName="books"
            label="Book"
            onSelectedChange={this.onBookSelected}
            selectedValue={this.state.bookSelected}
          />
        </form>
      </div>
    );
  }
}

export default VerseSelect;

import React from 'react';
import VerseSelect from './VerseSelect';
import bible from '../apis/bibleapi';

class App extends React.Component {
  state = {
    bibles: [],
    bibleSelected: 'de4e12af7f28f599-01',
    books: [],
    bookSelected: null,
    // chapters: [],
    // chapterSelected: null,
    // verses: [],
    // VerseSelected: null,
  };

  componentDidMount() {
    this.bookFetching(this.state.bibleSelected);
  }

  bookFetching = async (query) => {
    const bibles = await bible.get();
    const books = await bible.get(`/${query}/books`);
    this.setState({
      bibles: bibles,
      books: books.data.data,
    });
  };

  render() {
    return (
      <div>
        <h1>Bible Verses Side by Side</h1>
        <VerseSelect books={this.state.books} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import VerseSelect from './VerseSelect';
import bibleapi from '../apis/bibleapi';

class App extends React.Component {
  state = {
    bibles: [],
    bibleSelected: 'de4e12af7f28f599-01',
  };

  componentDidMount() {
    this.bookFetch(this.state.bibleSelected);
  }

  bookFetch = async (query) => {
    // const bibles = await bibleapi.get();
    const books = await bibleapi.get(`/${query}/books`);
    this.setState({
      // bibles: bibles,
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

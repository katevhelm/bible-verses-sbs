import React from 'react';
import VerseSelect from './VerseSelect';
import bible from '../apis/bible';

class App extends React.Component {
  state = {
    bibles: [],
    bibleSelected: 'de4e12af7f28f599-01',
    books: [],
    bookSelected: '',
    chapters: [],
    chapterSelected: '',
    verses: [],
    VerseSelected: '',
  };

  componentDidMount() {
    this.dataFetching(this.state.bibleSelected);
  }

  dataFetching = async (query) => {
    const bibles = await bible.get();
    const books = await bible.get(`/${query}/books`);
    this.setState({
      bibles: bibles,
      books: books.data.data,
    });
    console.log(this.state.books);
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

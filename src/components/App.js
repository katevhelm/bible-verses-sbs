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
    const response = await bible.get(`/${query}`);
    console.log(response);
  };

  render() {
    return (
      <div>
        <h1>Bible Verses Side by Side</h1>
        <VerseSelect />
      </div>
    );
  }
}

export default App;

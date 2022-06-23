import React from 'react';
import bibleapi from '../apis/bibleapi';
import VerseSelect from './VerseSelect';
import VersionDisplay from './VersionDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.vdRef = React.createRef();
  }

  state = {
    bibles: [],
    bibleSelected: 'de4e12af7f28f599-02',
    books: [],
    bookSelected: null,
    verseSelected: '',
  };

  componentDidMount() {
    this.bookFetch(this.state.bibleSelected);
  }

  bookFetch = async (query) => {
    const books = await bibleapi.get(`/${query}/books`);
    this.setState({
      // bibles: bibles,
      books: books.data.data,
    });
  };

  onVerseDisplayReload = (verseSelectedId) => {
    this.setState({ verseSelected: verseSelectedId });
  };

  render() {
    return (
      <div className="content">
        <h1>Bible Verses Side by Side</h1>
        <VerseSelect
          books={this.state.books}
          onReloadDisplay={this.onVerseDisplayReload}
        />
        {this.state.verseSelected !== '' && (
          <div>
            <VersionDisplay
              ref={this.vdRef}
              versionName="King James Version"
              versionId="de4e12af7f28f599-02"
              verseId={this.state.verseSelected}
            />
            <VersionDisplay
              versionName="American Standard Version"
              versionId="06125adad2d5898a-01"
              verseId={this.state.verseSelected}
            />
            <VersionDisplay
              versionName="World English Bible"
              versionId="9879dbb7cfe39e4d-01"
              verseId={this.state.verseSelected}
            />
            <VersionDisplay
              versionName="Vietnamese Bible"
              versionId="1b878de073afef07-01"
              verseId={this.state.verseSelected}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;

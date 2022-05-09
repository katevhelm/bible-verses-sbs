import React from 'react';
import Dropdown from './Dropdown';
import bibleapi from '../apis/bibleapi';

class VerseSelect extends React.Component {
  state = {
    bookSelected: '',
    bookSelectedId: '',
    chapters: [],
    chapterSelected: '',
    chapterSelectedId: '',
    verses: [],
    verseSelected: '',
  };

  chapterFetch = async (query) => {
    const chapters = await bibleapi.get(
      `/de4e12af7f28f599-01/books/${query}/chapters`
    );
    this.setState({ chapters: chapters.data.data }, () =>
      console.log(this.state.chapters)
    );
  };

  verseFetch = async (query) => {
    const verses = await bibleapi.get(
      `/de4e12af7f28f599-01/chapters/${query}/verses`
    );
    // reformat verses to get a number to display
    const versesPrepped = verses.data.data.map(({ id }, index) => ({
      id: id,
      number: index + 1,
    }));
    this.setState({ verses: versesPrepped }, () =>
      console.log(this.state.verses)
    );
  };

  onBookSelected = (e) => {
    // getting 'id' of the selected option
    const index = e.target.selectedIndex;
    const selectedId = e.target.childNodes[index].getAttribute('id');
    // setState is asynchronous function
    this.setState(
      { bookSelected: e.target.value, bookSelectedId: selectedId },
      () => this.chapterFetch(this.state.bookSelectedId)
    );
  };

  onChapterSelected = (e) => {
    // getting 'id' of the selected option
    const index = e.target.selectedIndex;
    const selectedId = e.target.childNodes[index].getAttribute('id');
    this.setState(
      { chapterSelected: e.target.value, chapterSelectedId: selectedId },
      () => this.verseFetch(this.state.chapterSelectedId)
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
            valueDisplayed="name"
            optionsName="books"
            label="Book"
            onSelectedChange={this.onBookSelected}
            selectedValue={this.state.bookSelected}
          />
          <Dropdown
            options={this.state.chapters}
            valueDisplayed="number"
            optionsName="chapters"
            label="Chapter"
            onSelectedChange={this.onChapterSelected}
            selectedValue={this.state.chapterSelected}
          />
          <Dropdown
            options={this.state.verses}
            valueDisplayed="number"
            optionsName="verses"
            label="Verse"
            selectedValue={this.state.verseSelected}
          />
        </form>
      </div>
    );
  }
}

export default VerseSelect;

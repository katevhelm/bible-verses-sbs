import React from 'react';
import Dropdown from './Dropdown';
import bibleapi from '../apis/bibleapi';

class VerseSelect extends React.Component {
  state = {
    bookSelected: 'Genesis',
    bookSelectedId: 'GEN',
    chapters: [],
    chapterSelected: '',
    chapterSelectedId: '',
    verses: [],
    verseSelected: '',
    verseSelectedId: '',
  };

  componentDidMount() {
    this.chapterFetch(this.state.bookSelectedId);
  }

  chapterFetch = async (query) => {
    const chapters = await bibleapi.get(
      `/de4e12af7f28f599-02/books/${query}/chapters`
    );
    // removing "intro" from chapters array
    chapters.data.data.splice(0, 1);
    this.setState({ chapters: chapters.data.data });
  };

  verseFetch = async (query) => {
    const verses = await bibleapi.get(
      `/de4e12af7f28f599-02/chapters/${query}/verses`
    );
    // reformat verses to get a number to display
    const versesPrepped = verses.data.data.map(({ id }, index) => ({
      id: id,
      number: index + 1,
    }));
    this.setState({ verses: versesPrepped });
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

  onVerseSelected = (e) => {
    // getting 'id' of the selected option
    const index = e.target.selectedIndex;
    const selectedId = e.target.childNodes[index].getAttribute('id');
    this.setState(
      {
        verseSelected: e.target.value,
        verseSelectedId: selectedId,
      },
      () => this.props.onReloadDisplay(this.state.verseSelectedId)
    );
  };

  render() {
    if (this.props.books.length === 0) {
      return;
    }
    return (
      <div>
        <h3>Choose a verse:</h3>
        <form className="select-form">
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
            onSelectedChange={this.onVerseSelected}
            selectedValue={this.state.verseSelected}
          />
        </form>
      </div>
    );
  }
}

export default VerseSelect;

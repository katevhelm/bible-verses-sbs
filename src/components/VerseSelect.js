import React from 'react';
import Dropdown from './Dropdown';
import bibleapi from '../apis/bibleapi';

class VerseSelect extends React.Component {
  state = {
    bookSelected: '',
    bookSelectedId: '',
    chapters: [],
    chapterSelected: '',
  };

  chapterFetch = async (query) => {
    const chapters = await bibleapi.get(
      `/de4e12af7f28f599-01/books/${query}/chapters`
    );
    console.log('finish fetch chapters');
    this.setState({ chapters: chapters.data.data }, () =>
      console.log(this.state.chapters)
    );
  };

  onBookSelected = (e) => {
    // getting 'id' of the selected option
    const index = e.target.selectedIndex;
    const indexSelected = e.target.childNodes[index];
    const selectedId = indexSelected.getAttribute('id');
    // setState is asynchronous function
    this.setState(
      { bookSelected: e.target.value, bookSelectedId: selectedId },
      () => this.chapterFetch(this.state.bookSelectedId)
    );
  };

  // componentDidUpdate() {}

  render() {
    console.log('in render', this.state.chapters);
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
        </form>
      </div>
    );
  }
}

export default VerseSelect;

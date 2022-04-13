import React from 'react';
import VerseSelect from './VerseSelect';

class App extends React.Component {
  state = {};

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

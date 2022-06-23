import React from 'react';
import bibleapi from '../apis/bibleapi';

class VersionDisplay extends React.Component {
  state = {
    verseContent: '',
  };

  componentDidMount() {
    this.contentFetch(this.props.versionId, this.props.verseId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.verseId !== this.props.verseId) {
      this.contentFetch(this.props.versionId, this.props.verseId);
    }
  }

  contentFetch = async (versionId, verseId) => {
    const verseContent = await bibleapi.get(`/${versionId}/verses/${verseId}`);
    this.setState({ verseContent: verseContent.data.data.content });
  };

  render() {
    return (
      <div className="version-display">
        <h3>{this.props.versionName}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.verseContent }}
        ></div>
      </div>
    );
  }
}

export default VersionDisplay;

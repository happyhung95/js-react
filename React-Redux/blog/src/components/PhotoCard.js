import React from 'react';

class PhotoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };

    this.photoRef = React.createRef();
  }

  componentDidMount() {
    this.photoRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.photoRef.current.clientHeight;

    const spans = Math.ceil(height / 10);

    this.setState({ spans });
  };

  render() {
    const { id,url,title } = this.props;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img  key={id} ref={this.photoRef} alt={title} src={url} />
      </div>
    );
  }

}

export default PhotoCard;
import React from "react";
import { connect } from "react-redux";


class PhotoList extends React.Component {
  render() {
    const { photoArray } = this.props;

    if (!photoArray) {
      return null;
    };
    return (
    //<img className="item" key={photo.id} src={photo.url} />
    <div>
      {photoArray.map(photo => <img className="item" key={photo.id} src={photo.url}/>)}
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { photoArray: state.photos[ownProps.albumId]};
};

export default connect(mapStateToProps)(PhotoList);

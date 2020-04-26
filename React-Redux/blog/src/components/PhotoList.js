import "./PhotoList.css";
import React from "react";
import { connect } from "react-redux";
import PhotoCard from "./PhotoCard";

class PhotoList extends React.Component {
  render() {
    const { photoArray } = this.props;

    if (!photoArray) {
      return null;
    }
    return (
      <div className="image-list">
        {photoArray.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            url={photo.url}
            title={photo.title}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { photoArray: state.photos[ownProps.albumId] };
};

export default connect(mapStateToProps)(PhotoList);

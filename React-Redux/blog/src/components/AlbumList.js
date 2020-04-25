import React from "react";
import UserHeader from "./UserHeader";
import { connect } from "react-redux";
import { fetchAlbums, fetchPhotos } from "../actions";
import PhotoList from "./PhotoList";

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  renderList() {
    return this.props.albums.map((album) => {
      return (
        <div className="item" key={album.id}>
          <div className="content">
            <div className="description">
              <button
                className="ui button"
                onClick={() => this.props.fetchPhotos(album.id)}
              >
                {album.title}
              </button>
              <PhotoList albumId={album.id} />
              <UserHeader userId={album.userId} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { albums: state.albums };
};

export default connect(mapStateToProps, { fetchAlbums, fetchPhotos })(AlbumList);

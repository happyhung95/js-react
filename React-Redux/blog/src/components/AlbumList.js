import React from "react";
import UserHeader from "./UserHeader";
import { connect } from "react-redux";
import { fetchAlbums, fetchPhotos } from "../actions";
import PhotoList from "./PhotoList";

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  renderUserSection() {
    return this.props.users.map((user) => {
      const albumArray = this.props.albums.filter(
        (album) => album.userId === user.id
      );
      
      const renderList = () => {
        return albumArray.map((album) => {
          return (
            <div className="ui description">
              <button
                key={album.id}
                className="fluid ui button"
                onClick={() => this.props.fetchPhotos(album.id)}
              >
                {album.title}
              </button>
              <PhotoList albumId={album.id} />
            </div>
          );
        });
      };

      return (
        <div className="item" key={user.id}>
          <div className="content">
            <div className="header">
              <UserHeader userId={user.id} />
              {renderList()}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div className="ui relaxed divided list">{this.renderUserSection()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { albums: state.albums, users: state.users };
};

export default connect(mapStateToProps, { fetchAlbums, fetchPhotos })(
  AlbumList
);

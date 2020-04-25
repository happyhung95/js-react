import React from 'react';
import './App.css';
import SeasonDisplay from './SeasonDisplay.js';
import Loader from './Loader';

class App extends React.Component {
  /* constructor (props) {
    super(props);
    this.state = {lat: null, errorMessage: ''}
  }*/
  state = {lat: null, errorMessage: ''}

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({lat:position.coords.latitude}),
      err => this.setState({errorMessage: err.message})
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return  <SeasonDisplay lat={this.state.lat}/>
    }

    return <Loader/>;
  }
  
  
  // react says we have to define render!!
  render() {
    return(
      <div>
      {this.renderContent()}
      </div>
    )
    
  }
}

export default App;

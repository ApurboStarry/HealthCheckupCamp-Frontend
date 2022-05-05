import React, { Component } from 'react'

class Spinner extends Component {
  state = {  } 
  render() { 
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <h1>Please wait. Fetching data from server.</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
 
export default Spinner;
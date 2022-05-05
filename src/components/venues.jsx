import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import venueService from "../services/venueService";
import Spinner from './common/spinner';

class Venues extends Component {
  state = { venues: [] } 

  async componentDidMount() { 
    const venues = await venueService.getAllVenues();
    this.setState({ venues });
  }

  render() { 
    const { venues } = this.state;
    console.log(venues);

    if(venues.length === 0) {
      return (
        <Spinner />
      );
    }

    return (
      <div className='venuesTable'>
        <div>
          <h1>Venues</h1>
        </div>
        <table style={{ marginTop: 20 }} className="table">
          <thead>
            <tr>
              <th scope="col">Venue Name</th>
              <th scope="col">Location</th>
              <th scope="col">Organization</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => {
              return (
                <tr key={venue._id}>
                  <td>
                    <Link to={"/venues/" + venue._id}>{venue.name}</Link>
                  </td>
                  <td>{venue.location}</td>
                  <td>{venue.organization.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
 
export default Venues;
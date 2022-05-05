import React, { Component } from 'react'
import venueService from '../services/venueService';
import authService from "../services/authService";
import Spinner from './common/spinner';
import { Link } from 'react-router-dom';

class OrgainzationVenues extends Component {
  state = {};

  async componentDidMount() {
    const currentUser = authService.getCurrentUser();
    const organizationId = currentUser._id;
    const venues = await venueService.getAllVenuesByOrganization(
      organizationId
    );
    this.setState({ venues });
  }

  handleRemoveVenue = async (venueId) => {
    const originalVenues = [...this.state.venues];
    const newVenues = this.state.venues.filter(venue => venue._id !== venueId);
    this.setState({ venues: newVenues });

    try {
      await venueService.deleteVenue(venueId);
    } catch (error) {
      this.setState({ venues: originalVenues });
    }

  };

  render() {
    const { venues } = this.state;
    if (!venues) {
      return <Spinner />;
    }

    return (
      <div style={{ marginLeft: 100 }}>
        <h1>OrgainzationVenues</h1>
        <Link to="/addVenue" className="btn btn-success m-2">
          Add Venue
        </Link>
        <h3 style={{ marginTop: 40 }}>Your venues are as follows:</h3>
        {venues.map((venue) => {
          return (
            <div key={venue._id}>
              <span>{venue.name}</span>
              <Link to={"/allAllocatedSlots/" + venue._id}>
                <button className="btn btn-primary m-2">See slots</button>
              </Link>
              <button
                onClick={() => this.handleRemoveVenue(venue._id)}
                className="btn btn-danger m-2"
              >
                Remove Venue
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
 
export default OrgainzationVenues;
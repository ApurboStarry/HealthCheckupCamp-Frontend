import React, { Component } from "react";
import authService from "../services/authService";
import { Navigate } from "react-router-dom";
import venueService from "../services/venueService";
import slotService from "../services/slotService";
import Spinner from "./common/spinner";
import { Link } from "react-router-dom";

class VenueInfo extends Component {
  state = { userAllocatedSlots: [] };

  async componentDidMount() {
    const venueId = this.props.venueId;
    const venue = await venueService.getVenueById(venueId);
    const userAllocatedSlots = await slotService.getAllocatedSlotsOfEmployee(
      venueId
    );
    console.log("Venue", venue);
    console.log("userAllocatedSlots", userAllocatedSlots);

    this.setState({ venue, userAllocatedSlots });
  }

  handleCancelSchedule = async (slotId) => {
    const originalUserAllocatedSlots = this.state.userAllocatedSlots;
    const newUserAllocatedSlots = this.state.userAllocatedSlots.filter(
      (slot) => slot._id !== slotId
    );
    console.log(newUserAllocatedSlots);
    this.setState({ userAllocatedSlots: newUserAllocatedSlots });

    try {
      await slotService.cancelSlot(slotId);
    } catch (error) {
      this.setState({ userAllocatedSlots: originalUserAllocatedSlots });
    }
  };

  getHumanFriendlySchedule = (scheduledAt) => {
    return new Date(scheduledAt).toString();
  };

  render() {
    const { venue, userAllocatedSlots } = this.state;
    if (!venue) {
      return <Spinner />;
    }

    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.userType.toLowerCase() !== "employee") {
      return <Navigate to="/employeeLogin" />;
    }

    console.log("Organization", venue.organization);

    return (
      <div style={{ marginLeft: 100 }}>
        <div>
          <h1>Venue Info</h1>
          <p>Venue Name: {venue.name}</p>
          <p>Venue Location: {venue.location}</p>
          {venue.organization.name && (
            <p>Organization: {venue.organization.name}</p>
          )}
        </div>

        <div>
          <Link to={"/allocateSlot/" + venue._id}>
            <button className="btn btn-primary">Schedule a slot</button>
          </Link>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3>Your allocated slots at this venue are as follows:</h3>
          {userAllocatedSlots.length === 0 && (
            <p>Currently you have no allocated slot in this venue</p>
          )}
          {userAllocatedSlots.map((slot) => {
            const slotSchedule = new Date(slot.scheduledAt);
            console.log(slotSchedule);

            return (
              <p key={slot._id}>
                Schedule: {this.getHumanFriendlySchedule(slot.scheduledAt)}
                <Link to={"/rescheduleSlot/" + slot._id + "/" + slot.scheduledAt}>
                  <button className="btn btn-warning m-2">Reschedule</button>
                </Link>
                <button
                  onClick={() => this.handleCancelSchedule(slot._id)}
                  className="btn btn-danger m-2"
                >
                  Cancel Schedule
                </button>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default VenueInfo;

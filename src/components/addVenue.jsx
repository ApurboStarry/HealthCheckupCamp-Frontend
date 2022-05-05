import React, { Component } from "react";
import venueService from "../services/venueService";
import Input from "./common/input";

class AddVenue extends Component {
  state = {
    data: { name: "", location: "" },
    errors: { name: "", location: "" },
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", this.state.data);
    
    await venueService.createVenue(this.state.data);
    window.location = "/organizationVenues";
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Add Venue</h1>
        <Input
          name="name"
          value={data.name}
          label="Name"
          onChange={this.handleChange}
          error={errors.name}
          type="text"
        />
        <Input
          name="location"
          value={data.location}
          label="Location"
          onChange={this.handleChange}
          error={errors.location}
          type="text"
        />

        <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
      </div>
    );
  }
}

export default AddVenue;

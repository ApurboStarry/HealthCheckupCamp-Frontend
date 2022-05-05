import './App.css';

import { Route, Routes } from "react-router-dom";
import React, { Component } from 'react';

import auth from "./services/authService";

import NavBar from './components/common/navbar';
import Home from './components/home';
import Venues from './components/venues';
import NotFound from './components/common/not-found';
import Login from './components/login';
import Logout from "./components/common/logout";
import LoginForm from './components/common/loginForm';
import EmployeeRegister from './components/employeeRegister';
import OrganizationRegister from "./components/organizationRegister";
import Venue from './components/venue';
import AllocateSlot from './components/allocateSlot';
import RescheduleSlot from './components/rescheduleSlot';
import OrgainzationVenues from './components/organizationVenues';
import AddVenue from './components/addVenue';
import AllAllocatedSlots from './components/allAllocatedSlots';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("User", user);
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/employeeLogin" element={<LoginForm variant="Employee" />} />
          <Route path="/organizationLogin" element={<LoginForm variant="Organization" />} />
          <Route path="/employeeRegister" element={<EmployeeRegister />} />
          <Route path="/organizationRegister" element={<OrganizationRegister />} />

          <Route path="/employeeVenues/:venueId" element={<Venue /> } />
          <Route path="/employeeVenues" element={<Venues />} />
          <Route path="/allocateSlot/:venueId" element={<AllocateSlot />} />
          <Route path="/rescheduleSlot/:slotId/:scheduledAt" element={<RescheduleSlot />} />

          <Route path="/organizationVenues" element={<OrgainzationVenues />} />
          <Route path="/addVenue" element={<AddVenue />} />
          <Route path="/allAllocatedSlots/:venueId" element={<AllAllocatedSlots />} />

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound /> } />
        </Routes>
      </div>
    );
  }
}

export default App;

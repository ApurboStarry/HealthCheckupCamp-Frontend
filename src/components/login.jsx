import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
  state = {  } 
  render() { 
    return (
      <div>
        <Link to="/employeeLogin">Login as an employee</Link>
        <p>or</p>
        <Link to="/organizationLogin">Login as organization</Link>
      </div>
    );
  }
}
 
export default Login;
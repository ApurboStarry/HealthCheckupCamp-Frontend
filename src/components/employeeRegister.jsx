import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "./common/input";
import auth from "../services/authService";
import employeeService from "../services/employeeService";

class EmployeeRegister extends Component {
  state = {
    data: { email: "", password: "", confirmPassword: "", name: "", age: "" },
    errors: {},
  };

  validate = () => {
    const errors = {};

    const { data } = this.state;
    if (data.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (data.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (data.password.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const response = await employeeService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  validateProperty = ({ name, value }) => {
    if (name === "email") {
      if (value.trim() === "") return "Email is required";
    }
    if (name === "name") {
      if (value.trim() === "") return "Name is required";
    }
    if (name === "password") {
      const minimumPasswordLength = 5;
      if (value.length < minimumPasswordLength)
        return `Password should be at least ${minimumPasswordLength} characters long`;
      if (!/\d/.test(value))
        return "Password should contain atleast one number";
      if (!/[a-z]/.test(value))
        return "Password should contain atleast one lowercase letter";
      if (!/[A-Z]/.test(value))
        return "Password should contain atleast one uppercase letter";
    }

    if (name === "confirmPassword") {
      if (value !== this.state.data.password)
        return "Make sure this matches your password";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="formStyle">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            value={data.email}
            label="Email"
            onChange={this.handleChange}
            error={errors.email}
            type="text"
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
            type="password"
          />
          <Input
            name="confirmPassword"
            value={data.confirmPassword}
            label="Confirm Password"
            onChange={this.handleChange}
            error={errors.confirmPassword}
            type="password"
          />
          <Input
            name="name"
            value={data.name}
            label="Name"
            onChange={this.handleChange}
            error={errors.name}
            type="text"
          />
          <Input
            name="age"
            value={data.age}
            label="Age"
            onChange={this.handleChange}
            error={errors.age}
            type="number"
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
          <div style={{ marginTop: 10 }}>
            <p>
              Already have an account? <Link to="/employeeLogin">Login</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default EmployeeRegister;

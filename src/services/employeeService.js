import httpService from "./httpService";
import config from "../config.json";

async function login(email, password) {
  const apiEndpoint = config.apiUrl + "/employee/login";
  const { data } = await httpService.post(apiEndpoint, {
    email,
    password,
  });

  return data;
}

async function register({ email, password, name, age }) {
  const apiEndpoint = config.apiUrl + "/employee/register";
  age = Number(age);

  return httpService.post(apiEndpoint, {
    email,
    password,
    name,
    age,
  });
}

const employeeService = {
  login,
  register,
};

export default employeeService;

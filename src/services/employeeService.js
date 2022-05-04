import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/employee/login";

async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint, {
    email,
    password
  });

  return data;
}

const employeeService = {
  login
}

export default employeeService;
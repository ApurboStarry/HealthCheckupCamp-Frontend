import httpService from "./httpService";
import config from "../config.json";


async function login(email, password) {
  const apiEndpoint = config.apiUrl + "/organization/login";
  const { data } = await httpService.post(apiEndpoint, {
    email,
    password,
  });

  return data;
}

async function register({ email, password, name }) {
  const apiEndpoint = config.apiUrl + "/organization/register";
  return httpService.post(apiEndpoint, {
    email,
    password,
    name
  });
}

const organizationService = {
  login,
  register
};

export default organizationService;

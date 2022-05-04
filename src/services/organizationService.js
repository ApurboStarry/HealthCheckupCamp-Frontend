import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/organization/login";

async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint, {
    email,
    password,
  });

  return data;
}

const organizationService = {
  login,
};

export default organizationService;

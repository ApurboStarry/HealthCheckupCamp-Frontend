import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import employeeService from "./employeeService";
import organizationService from "./organizationService";

const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(email, password, variant) {
  if(variant.toLowerCase() === "employee") {
    const jwt = await employeeService.login(email, password);
    localStorage.setItem(tokenKey, jwt);
  } else if(variant.toLowerCase() === "organization") {
    const jwt = await organizationService.login(email, password);
    console.log(jwt);
    localStorage.setItem(tokenKey, jwt);
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const defaultObject = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default defaultObject;

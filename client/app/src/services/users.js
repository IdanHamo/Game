import httpService from "./httpservice";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", tokenKey);
}

async function createUser(user) {
  return await httpService.post("/users/createUser", user);
}

async function loginUser(user) {
  const { data } = await httpService.post("/auth/login", user);
  localStorage.setItem(tokenKey, data);
  setTokenHeader();
  return data;
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
  setTokenHeader();
}

function getJWT() {
  return localStorage.getItem(tokenKey);
}

function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const usersService = {
  createUser,
  loginUser,
  getJWT,
  getUser,
  logoutUser,
};

export default usersService;

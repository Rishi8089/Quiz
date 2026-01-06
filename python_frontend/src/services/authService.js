import api from "./api";

// REGISTER
export const registerUser = (data) => {
  return api.post("/accounts/register/", data);
};

// LOGIN
export const loginUser = (data) => {
  return api.post("/accounts/login/", data);
};

// LOGOUT (optional)
export const logoutUser = () => {
  return api.post("/accounts/logout/");
};

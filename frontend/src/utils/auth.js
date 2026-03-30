//to handle auth tasks

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAdmin = () => {
  return getUser()?.role === "admin";
};

export const isUser = () => {
  return getUser()?.role === "user";
};
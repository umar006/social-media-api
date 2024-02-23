import axios from "axios";

const baseURL = "http://localhost:3000";

export const setHeaderAuth = () => {
  const token = window.localStorage.getItem("accessToken");
  withAuth.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const withAuth = axios.create({
  baseURL: baseURL,
});

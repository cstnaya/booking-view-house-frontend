import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800",
});

api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.withCredentials = true;

export { api };

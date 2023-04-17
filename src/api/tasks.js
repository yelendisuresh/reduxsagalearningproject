import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000"
});

export const fetchTasks = () => {
  return api( { method: "GET", url: "/tasks" });
};

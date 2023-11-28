import axios from "axios";

const baseURL = "node-work";

const service = axios.create({
  baseURL
  // timeout:5000
});

export default service;

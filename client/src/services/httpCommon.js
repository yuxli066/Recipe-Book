import axios from "axios";

const server_ip = "208.68.39.73";
// constant variables
const base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:50150/v1/"
    : `${server_ip}/v1/`;

export default axios.create({
  baseURL: base,
  headers: {
    "Content-type": "application/json",
  },
});

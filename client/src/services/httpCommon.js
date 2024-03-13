import axios from "axios";

// constant variables
const base =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3001/v1/"
    : "http://20.102.36.29:5000/v1/";

export default axios.create({
  baseURL: base,
  headers: {
    "Content-type": "application/json",
  },
});

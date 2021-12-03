import axios from "axios";

// constant variables
const base = "http://localhost:5000/v1/";

export default axios.create({
  baseURL: base,
  headers: {
    "Content-type": "application/json",
  },
});

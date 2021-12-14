import axios from "axios";

// constant variables
const base = "http://20.102.36.29:5000/v1/";

export default axios.create({
  baseURL: base,
  headers: {
    "Content-type": "application/json",
  },
});

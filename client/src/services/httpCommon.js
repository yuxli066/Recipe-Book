import axios from "axios";

const server_ip = "api.asianmomrecipes.com";

// constant variables
const base =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? "http://localhost:50150/v1/"
    : `https://${server_ip}/v1/`;

const http_instance = axios.create({
  baseURL: base,
  headers: {
    "Content-type": "application/json",
  },
});

http_instance.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects
http_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [301, 302].includes(error.response.status)) {
      const redirectUrl = error.response.headers.location;
      console.log("redirect URL:", redirectUrl);
      return http_instance.get(redirectUrl);
    }
    return Promise.reject(error);
  }
);

export default http_instance;

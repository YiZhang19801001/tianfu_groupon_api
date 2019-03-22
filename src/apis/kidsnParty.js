import axios from "axios";

export default axios.create({
  baseURL: `http://kidsnparty.com.au/roben_api/groupon/public/api`
  // baseURL: `http://localhost/groupon_api/public/api`
  // baseURL: `http://localhost:8000/api`
});

export const baseUrl =
  "http://kidsnparty.com.au/roben_api/beautifulfruit/public";

import axios from "axios";

// Set config defaults when creating the instance
const BaseUrl = axios.create({
  baseURL: "http://34.221.104.212:81",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default BaseUrl;
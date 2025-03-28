import axios from "axios";

const api = axios.create({
  baseURL: "https://vercel-fastapi-henna.vercel.app/", // Update with your server URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

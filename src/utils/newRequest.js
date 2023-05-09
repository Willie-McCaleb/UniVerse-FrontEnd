import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://universe-backend-y14p.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;

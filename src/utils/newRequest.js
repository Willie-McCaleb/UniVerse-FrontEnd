import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://universe-v24c.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;

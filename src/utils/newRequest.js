import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://universe-senior.herokuapp.com/api/",
  withCredentials: true,
});

export default newRequest;

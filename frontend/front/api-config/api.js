import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.BASE_URL,
})

Axios.defaults.headers.post["Content-Type"] = "application/json";

export default Axios;

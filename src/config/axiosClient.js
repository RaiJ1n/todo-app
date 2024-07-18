import axios from "axios";

const apiclient = axios.create({
    baseURL: "http://localhost:4001/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default apiclient;
















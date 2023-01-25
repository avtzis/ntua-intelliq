import axios from "axios";

const setAuthToken = () => {
    const token = localStorage.getItem("token");

    if(token) {
        axios.interceptors.request.use(
            config => {
              config.headers['X-OBSERVATORY-AUTH'] = token;
            },
            error => {
              return Promise.reject(error);
            }
        )
    }
}

export default setAuthToken
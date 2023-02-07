import axios from "axios";
import api from "./api";

const logoutUser = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
    if(token) {
        await axios.post(api + '/logout')
    }
    localStorage.setItem("token", 'no token');
    window.location.href = '/';
}

export default logoutUser
import axios from "axios";

const logoutUser = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
    if(token) {
        await axios.post('https://localhost:9103/intelliq_api/logout')
    }
    localStorage.setItem("token", 'no token');
    window.location.href = '/';
}

export default logoutUser
import React from "react";
import axios from "axios";

const Logout = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
    if(token) {
        await axios.post('https://192.168.1.4:9103/intelliq_api/logout')
    }
    localStorage.setItem("token", 'no token');
    window.location.href = '/';

    return (
        <React.Fragment />
    )
}

export default Logout
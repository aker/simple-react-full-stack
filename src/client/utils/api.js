// import React from "react";
import axios from "axios";
// import { AuthConsumer } from "../authContext";

/* let accessToken = () => (
    <AuthConsumer>
        {({accessToken}) => accessToken}
    </AuthConsumer>
); */

// var baseURL = '/';

export default axios.create({
    baseURL: localStorage.getItem('base_url'),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
});
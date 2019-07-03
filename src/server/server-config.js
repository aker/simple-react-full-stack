const PORT = 8580;

const AUTH_CONFIG = {
    clientId: process.env.CLIENT_ID ? process.env.CLIENT_ID : 'auth-client-web-id',
    clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : 'secret',
    tokenHost: process.env.TOKEN_HOST ? process.env.TOKEN_HOST : 'http://localhost:8181',
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize'
}

// const BASE_API_URL = "http://localhost:8080/api";
const BASE_API_URL = process.env.BASE_API_URL ? process.env.BASE_API_URL : 'http://localhost:8080/api';

module.exports = {
    PORT: PORT,
    AUTH_CONFIG: AUTH_CONFIG,
    BASE_API_URL: BASE_API_URL,
};
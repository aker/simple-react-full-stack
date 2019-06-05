const PORT = 8580;

const AUTH_CONFIG = {
    clientId: 'auth-client-web-id',
    clientSecret: 'secret',
    tokenHost: 'http://localhost:8181',
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize'
}

// const BASE_API_URL = "http://localhost:8080/api";
const BASE_API_URL = "http://localhost:8181/";

module.exports = {
    PORT: PORT,
    AUTH_CONFIG: AUTH_CONFIG,
    BASE_API_URL: BASE_API_URL,
};
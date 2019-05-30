const PORT = 8580;

const AUTH_CONFIG = {
    clientId: 'auth-client-web-id',
    clientSecret: 'secret',
    tokenHost: 'http://localhost:8181',
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize'
}

module.exports = {
    PORT: PORT,
    AUTH_CONFIG: AUTH_CONFIG
};
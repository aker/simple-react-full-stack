const server = require('./server-config');
const express = require('express');
const os = require('os');
const simpleOauthModule = require('simple-oauth2');
const jwt = require('jsonwebtoken');

const redirectHost = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:' + server.PORT;

const oauth2 = simpleOauthModule.create({
    client: {
      id: server.AUTH_CONFIG.clientId,
      secret: server.AUTH_CONFIG.clientSecret,
    },
    auth: {
      tokenHost: server.AUTH_CONFIG.tokenHost,
      tokenPath: server.AUTH_CONFIG.tokenPath,
      authorizePath: server.AUTH_CONFIG.authorizePath
    },
});

const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectHost + '/#/callback',
    state: '3(#0/!~',
});

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
});

app.get('/token', async (req, res) => {
    const tokenConfig = {
      code: req.query.code,
      redirect_uri: redirectHost + '/#/callback',
    };

    console.log('The code: ', req.query.code);

    try {
      const result = await oauth2.authorizationCode.getToken(tokenConfig);

      const accessToken = oauth2.accessToken.create(result);
      console.log('The accessToken:', accessToken.token.access_token);

      let decoded = jwt.verify(accessToken.token.access_token, '123');

      let data = {
        sub: decoded.user_name,
        email: decoded.email,
        authorities: decoded.authorities,
        permissions: decoded.permissions,
        role: decoded.authorities,
        accessToken: accessToken.token.access_token,
        baseApiURL: server.BASE_API_URL,
      };

      return res.status(200).json(data);
    } catch(error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
});

app.listen(process.env.PORT || server.PORT, () => console.log(`Listening on port ${process.env.PORT || server.PORT}!`));

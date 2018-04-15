const host = process.env.HOST || '0.0.0.0';

const port = process.env.PORT || 8080;

const corsAnywhere = require('cors-anywhere');

const corsServer = corsAnywhere.createServer({
  originWhitelist: ['https://psdcode.github.io'],
  removeHeaders: ['cookie', 'cookie2'],
  requireHeader: ['origin', 'x-requested-with']
});

corsServer.listen(port, host, function () {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

const host = process.env.HOST || '0.0.0.0';

const port = process.env.PORT || 8080;

const corsAnywhere = require('cors-anywhere');
const yelpApiKey = `n9BZFWy_zC3jyQyNV9u0Tdc6IhfkwyV8b4JBg2NYD9AaQuHaUx6II9\
ukiEQp2Z03m7Cmycz29Lu2n4Gc5LPu1wDjVVCGyignkEoZn167yyq07sbPEN7gF5GzE20YWnYx`;

const corsServer = corsAnywhere.createServer({
  originWhitelist: ['https://psdcode.github.io'],
  removeHeaders: ['cookie', 'cookie2'],
  requireHeader: ['origin', 'x-requested-with'],
  setHeaders: {'authorization': `Bearer ${yelpApiKey}`}
});

corsServer.listen(port, host, function () {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

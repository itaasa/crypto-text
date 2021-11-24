const config = require ('config');
const rp = require('request-promise');

var btcCoin = '' ;
var ethCoin = '';

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    'id': '1,1027',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': config.get('coinMarketApiKey')
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {

    btcCoin = 'Bitcoin: ' + response.data['1'].quote.USD.price;
    ethCoin = 'Ethereum: ' + response.data['1027'].quote.USD.price;
    const textMessage = btcCoin + '\n' + ethCoin + '\n\n' + 'All prices are in USD.';

    const TWILIO_ACCOUNT_SID = config.get('twilioAccountSid');
    const TWILIO_AUTH_TOKEN = config.get('twilioAuthToken');
    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    client.messages 
    .create({ 
       body: textMessage,
       messagingServiceSid: config.get('twilioMessageServiceId'),      
       to: config.get('myPhoneNumber') 
     }) 
    .then(message => console.log(message.sid)) 
    .done();

    //TODO: Text only if price is under a certain amount that user wants, if none is specified then text daily/6hours/12hours etc.

}).catch((err) => {
  console.log('API call error:', err.message);
});


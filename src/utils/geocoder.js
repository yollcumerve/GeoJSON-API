const NodeGeoCoder = require('node-geocoder')

const options = {
    provider: process.env.CONSUMER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.CONSUMER_KEY, 
    formatter: null 
  };
  
  const geocoder = NodeGeoCoder(options);
 
module.exports = geocoder
var TravelTimeApi = require('traveltime-api-sdk-ts');

var defaultClient = TravelTimeApi.ApiClient.instance;
// Configure API key authorization: ApiKey
var ApiKey = defaultClient.authentications['ApiKey'];
ApiKey.apiKey = "60cf6646c39e45a0de83a59baa00a57d"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
ApiKey.apiKeyPrefix['X-Api-Key'] = "Token"
// Configure API key authorization: ApplicationId
var ApplicationId = defaultClient.authentications['ApplicationId'];
ApplicationId.apiKey = "dfc45614"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
ApplicationId.apiKeyPrefix['X-Application-Id'] = "Token"

var api = new TravelTimeApi.DefaultApi()
var lat = 3.4; // {Number} 
var lng = 3.4; // {Number} 
var opts = {
  'withinCountry': "withinCountry_example" // {String} 
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.geocodingReverseSearch(lat, lng, opts, callback);


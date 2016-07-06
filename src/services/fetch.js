var Fetch = require('whatwg-fetch');

var baseUrl = 'https://fhir-open.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f';

var service = {
  get: function(url, options) {
    return fetch(baseUrl + url, options)
    .then(res => {                      // http://stackoverflow.com/questions/35280690/simple-get-request-with-node-js-and-express
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Oops! Something went wrong");
      }
    })
    .then(json => {
      return json.entry;
    })
    .catch(function(err) {
      return err;
    });
  }
};

module.exports = service;


/*.then(function(response) {
console.log("response.status - ", response.status);
console.log("response.body - ", response.body);
  return response.json();
})

*/

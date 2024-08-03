const request = require("request")
const forecast = (latitude, longitude, callback) => {
   const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q="
      + longitude + "," + latitude

   request({ url, json: true }, (error, response) => {

      if (error) {
         callback("Error has occured", undefined)
      } else if (response.body.error) {
         callback(response.body.error.message, undefined)
        } else {
          callback(undefined,  response.body.location.name +
             " the weather is " + response.body.current.condition.text + '  and temp = ' + response.body.current.temp_c)
      }
   })
}
module.exports = forecast
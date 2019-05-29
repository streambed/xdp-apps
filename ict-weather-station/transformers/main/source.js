/*******************************************************************************
 * 
 *  Transformation code for ICT Weather Station Sensor 
 * 
 * ****************************************************************************/

// OUTLET DEFINITIONS:
var ATMOSPHERIC_PRESSURE = 0;
var X_ORIENTATION = 1;
var Y_ORIENTATION = 2;
var SOLAR_RADIATION = 3;
var RAIN_GAUGE = 4;
var STRIKE = 5;
var STRIKE_DISTANCE = 6;
var WIND_SPEED = 7;
var WIND_DIRECTION = 8;
var GUST_SPEED = 9;
var AIR_TEMPERATURE = 10;
var VAPOUR_PRESSURE = 11;
var RELATIVE_HUMIDITY = 12;

/**
 * Extracts bytes from byte_payload from start to end and converts these bytes 
 * into a float. Adapted from: 
 * https://www.thethingsnetwork.org/forum/t/decode-float-sent-by-lopy-as-node/8757/2
 * 
 * @param {*} byte_payload payload in bytes to be converted to float.
 * @param {*} start starting byte index in payload.
 * @param {*} end ending byte index in payload.
 */
function decodeFloat(byte_payload, start, end) {
  // Extract bytes from payload, converting each byte into its unicode value
  var bytes = [];
  for(var i = start; i < end; i++) 
    bytes.push(byte_payload[i].charCodeAt(0));

  // Convert bytes to a float
  var word = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (word>>>31 === 0) ? 1.0 : -1.0;
  var e = word>>>23 & 0xff;
  var m = (e === 0) ? (word & 0x7fffff)<<1 : (word & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);

  // Return float in 2 decimal places
  return float;
}  

/**
 * Transforms base_64 payload into an array of objects, each specifying a
 * certain observation type.
 * 
 * @param {*} time time of receiving the payload.
 * @param {*} nwkAddr network address of the end device.
 * @param {*} fPort determines which mode the packet will be read.
 * @param {*} base64_payload payload to be transformed.
 */

function transform(time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);

  var decoded = [];
  /* Header info, still in bytes form, should be converted to display on 
      dashboard. Also, if using this code, make sure outlets for following data 
      updated (below and in descriptor.js), and the above declared var decoded 
      is deleted. */

  // var decoded = [
  //   {outlet: 0, data: {time: time, nwkAddr: nwkAddr, 
  //     RTC: (payload[0]<<24 | payload[1]<<16 | payload[2]<<8 | payload[3])}},
  //   {outlet: 1, data: {time: time, nwkAddr: nwkAddr, 
  //     battery: ((payload[4]<<8 | payload[5])/1000)}},
  //   {outlet: 2, data: {time: time, nwkAddr: nwkAddr, 
  //     solar: ((payload[6]<<8 | payload[7])/1000)}},
  // ];

  /* If command flag == 1, extract the following information:
     atmosphericPressure, xOrientation, yOrientation */
  if (commandFlag === 1) {
    decoded.push (
      {outlet: ATMOSPHERIC_PRESSURE, data: {time: time, nwkAddr: nwkAddr, 
        atmosphericPressure: decodeFloat(payload, 10, 14)}},
      {outlet: X_ORIENTATION, data: {time: time, nwkAddr: nwkAddr, 
        xOrientation: decodeFloat(payload, 14, 18)}},
      {outlet: Y_ORIENTATION, data: {time: time, nwkAddr: nwkAddr, 
        yOrientation: decodeFloat(payload, 18, 22)}}
    );
  } 
  /* If command flag == 0, extract the following information:
     solar, precipitation, strikes, strikeDistance, windSpeed, windDirection, 
     gustSpeed, airTemperature, vapourPressure, relativeHumidity */
  else {
    decoded.push (
      {outlet: SOLAR_RADIATION, data: {time: time, nwkAddr: nwkAddr, 
        solarRadiation: decodeFloat(payload, 10, 14)}},
      {outlet: RAIN_GAUGE, data: {time: time, nwkAddr: nwkAddr, 
        level: decodeFloat(payload, 14, 18)}},
      {outlet: STRIKE, data: {time: time, nwkAddr: nwkAddr, 
        strikes: decodeFloat(payload, 18, 22)}},
      {outlet: STRIKE_DISTANCE, data: {time: time, nwkAddr: nwkAddr, 
        strikeDistance: decodeFloat(payload, 22, 26)}},
      {outlet: WIND_SPEED, data: {time: time, nwkAddr: nwkAddr, 
        windSpeed: decodeFloat(payload, 26, 30)}},
      {outlet: WIND_DIRECTION, data: {time: time, nwkAddr: nwkAddr, 
        windDirection: decodeFloat(payload, 30, 34)}},
      {outlet: GUST_SPEED, data: {time: time, nwkAddr: nwkAddr, 
        gustSpeed: decodeFloat(payload, 34, 38)}},
      {outlet: AIR_TEMPERATURE, data: {time: time, nwkAddr: nwkAddr, 
        airTemperature: decodeFloat(payload, 38, 42)}},
      {outlet: VAPOUR_PRESSURE, data: {time: time,nwkAddr: nwkAddr, 
        vapourPressure: decodeFloat(payload, 42, 46)}},
      {outlet: RELATIVE_HUMIDITY, data: {time: time, nwkAddr: nwkAddr, 
        relativeHumidity: decodeFloat(payload, 46, 50)}}
    );
  }
  return decoded;
}

function test() {
  var payload1 = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg==";
  var payload2 = "AAAHMRBqLy8BAELMR65CrzMzwqxmZkLMR65CrzMzwqxmZkLMR65CrzMzwqxmZkLMR64="
  var result1 = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload1);
  var result2 = transform("2019-03-30T12:05:07.123Z", 12345, 14, payload2);
  return (
    result1.length === 3 &&
    result1[0].data.atmosphericPressure === 102.13999938964844 &&
    result1[1].data.xOrientation === 87.5999984741211 &&
    result1[2].data.yOrientation === -86.19999694824219 &&
    result2.length === 10 &&
  	result2[0].data.solarRadiation === 102.13999938964844 &&
    result2[1].data.level === 87.5999984741211 &&
    result2[2].data.strikes ===  -86.19999694824219 &&
    result2[3].data.strikeDistance === 102.13999938964844 &&
    result2[4].data.windSpeed === 87.5999984741211 &&
    result2[5].data.windDirection === -86.19999694824219 &&
    result2[6].data.gustSpeed === 102.13999938964844 &&
    result2[7].data.airTemperature === 87.5999984741211 &&
    result2[8].data.vapourPressure ===  -86.19999694824219 &&
    result2[9].data.relativeHumidity === 102.13999938964844
  );
}
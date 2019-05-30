/*******************************************************************************
 * 
 *  Transformation code for ICT Weather Station Sensor 
 * 
 * ****************************************************************************/

// OUTLET DEFINITIONS:
const ATMOSPHERIC_PRESSURE = 0;
const X_ORIENTATION = 1;
const Y_ORIENTATION = 2;
const SOLAR = 3;
const RAIN_GAUGE = 4;
const STRIKE = 5;
const STRIKE_DISTANCE = 6;
const WIND_SPEED = 7;
const WIND_DIRECTION = 8;
const GUST_SPEED = 9;
const AIR_TEMPERATURE = 10;
const VAPOUR_PRESSURE = 11;
const RELATIVE_HUMIDITY = 12;

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
  // Extract bytes from payload, converting each byte into its unicode value.
  var bytes = [];
  for(var i = start; i < end; i++) 
    bytes.push(byte_payload[i].charCodeAt(0));

  // Convert bytes to a float.
  var word = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (word>>>31 === 0) ? 1.0 : -1.0;
  var e = word>>>23 & 0xff;
  var m = (e === 0) ? (word & 0x7fffff)<<1 : (word & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);

  // Return float unrounded.
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
  if (commandFlag === 0) {
    return [
      {outlet: SOLAR, data: {time: time, nwkAddr: nwkAddr, 
        solar: decodeFloat(payload, 10, 14)}},
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
    ];
  } else {
    return [
      {outlet: ATMOSPHERIC_PRESSURE, data: {time: time, nwkAddr: nwkAddr, 
        atmosphericPressure: decodeFloat(payload, 10, 14)}},
      {outlet: X_ORIENTATION, data: {time: time, nwkAddr: nwkAddr, 
        xOrientation: decodeFloat(payload, 14, 18)}},
      {outlet: Y_ORIENTATION, data: {time: time, nwkAddr: nwkAddr, 
        yOrientation: decodeFloat(payload, 18, 22)}}
    ];
  }
}

// Helper function for tests.
function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
      throw new Error(message);
    }
    throw message; // Fallback
  }
}
// Weather readings payload for command = 0.
function runWeatherTests() {
  var payload0 = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg==";
  var result0 = transform("2019-03-30T12:05:07.123Z", 12345, 14, payload0);
  assert(result0.length === 3, 
    'Error, expecting array length = 3');
  assert(result0[0].data.atmosphericPressure === 102.13999938964844, 
    'Error, expecting atmospheric pressure = 102.13999938964844');
  assert(result0[1].data.xOrientation === 87.5999984741211, 
    'Error, expecting xOrientation = 87.5999984741211');
  assert(result0[2].data.yOrientation === -86.19999694824219, 
    'Error, expecting yOrientation = -86.19999694824219');
}
// Barometer and compass readings payload for command = 1.
function runBarometerCompassTests() {
  var payload1 = "AAAHMRBqLy8BAELMR65CrzMzwqxmZkLMR65CrzMzwqxmZkLMR65CrzMzwqxmZkLMR64="
  var result1 = transform("2019-03-30T12:05:07.123Z", 12345, 14, payload1);
  assert(result1.length === 10, 
    'Error, expecting array length = 10');
  assert(result1[0].data.solar === 102.13999938964844,
    'Error, expecting solar = 102.13999938964844');
  assert(result1[1].data.level === 87.5999984741211,
    'Error, expecting level = 87.5999984741211');
  assert(result1[2].data.strikes ===  -86.19999694824219,
    'Error, expecting strikes = -86.19999694824219');
  assert(result1[3].data.strikeDistance === 102.13999938964844, 
    'Error, expecting strike distance = 102.13999938964844');
  assert(result1[4].data.windSpeed === 87.5999984741211,
    'Error, expecting wind speed = 87.5999984741211');
  assert(result1[5].data.windDirection === -86.19999694824219, 
    'Error, expecting wind direction = -86.19999694824219');
  assert(result1[6].data.gustSpeed === 102.13999938964844,
    'Error, expecting gust speed = 102.13999938964844');
  assert(result1[7].data.airTemperature === 87.5999984741211,
    'Error, expecting air temperature = 87.5999984741211');
  assert(result1[8].data.vapourPressure ===  -86.19999694824219,
    'Error, expecting vapour pressure = -86.19999694824219');
  assert(result1[9].data.relativeHumidity === 102.13999938964844,
    'Error, expecting relative humidity = 102.13999938964844');
}
/**
 * Tests for the two possible payloads types depending on command flag.
 */
function test() {
  runWeatherTests();
  runBarometerCompassTests();
  return 'Tests Passed!'
}
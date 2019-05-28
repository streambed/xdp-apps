/*******************************************************************************
 * 
 *  Transformation code for ICT Weather Station Sensor 
 * 
 * ****************************************************************************/

/**
 * Extracts bytes from byte_payload from start to end and converts these bytes 
 * into a float. Adapted from: 
 * https://www.thethingsnetwork.org/forum/t/decode-float-sent-by-lopy-as-node/8757/2
 * 
 * @param {*} byte_payload payload in bytes to be converted to float.
 * @param {*} start starting byte index in payload.
 * @param {*} end ending byte index in payload.
 */
function extractFloat(byte_payload, start, end) {
  // Extract bytes from payload, converting each byte into its unicode value
  var bytes = [];
  for(var i = start; i < end; i++) 
    bytes.push(byte_payload[i].charCodeAt(0));

  // Convert bytes to a float
  var bits = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
  var e = bits>>>23 & 0xff;
  var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);

  // Return float in 2 decimal places
  return Math.round(float*100)/100;
}  

/**
 * Transforms base_64 payload into an array of objects, each specifying a
 * certain observation type.
 * 
 * @param {*} time time of receiving payload?
 * @param {*} nwkAddr network address to be sent to?
 * @param {*} fPort idk?
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
  if (commandFlag) {
    decoded.push (
      {outlet: 0, data: {time: time, nwkAddr: nwkAddr, 
        atmosphericPressure: extractFloat(payload, 10, 14)}},
      {outlet: 1, data: {time: time, nwkAddr: nwkAddr, 
        xOrientation: extractFloat(payload, 14, 18)}},
      {outlet: 2, data: {time: time, nwkAddr: nwkAddr, 
        yOrientation: extractFloat(payload, 18, 22)}}
    );
  } 
  /* If command flag == 0, extract the following information:
     solar, precipitation, strikes, strikeDistance, windSpeed, windDirection, 
     gustSpeed, airTemperature, vapourPressure, relativeHumidity */
  else {
    decoded.push (
      {outlet: 3, data: {time: time, nwkAddr: nwkAddr, 
        solar: extractFloat(payload, 10, 14)}},
      {outlet: 4, data: {time: time, nwkAddr: nwkAddr, 
        precipitation: extractFloat(payload, 14, 18)}},
      {outlet: 5, data: {time: time, nwkAddr: nwkAddr, 
        strikes: extractFloat(payload, 18, 22)}},
      {outlet: 6, data: {time: time, nwkAddr: nwkAddr, 
        strikeDistance: extractFloat(payload, 22, 26)}},
      {outlet: 7, data: {time: time, nwkAddr: nwkAddr, 
        windSpeed: extractFloat(payload, 26, 30)}},
      {outlet: 8, data: {time: time, nwkAddr: nwkAddr, 
        windDirection: extractFloat(payload, 30, 34)}},
      {outlet: 9, data: {time: time, nwkAddr: nwkAddr, 
        gustSpeed: extractFloat(payload, 34, 38)}},
      {outlet: 10, data: {time: time, nwkAddr: nwkAddr, 
        airTemperature: extractFloat(payload, 38, 42)}},
      {outlet: 11, data: {time: time,nwkAddr: nwkAddr, 
        vapourPressure: extractFloat(payload, 42, 46)}},
      {outlet: 12, data: {time: time, nwkAddr: nwkAddr, 
        relativeHumidity: extractFloat(payload, 46, 50)}}
    );
  }
  return decoded;
}

function test() {
  payload = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg==";
  var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload);
  return result[0].data.atmosphericPressure === 102.14;
}
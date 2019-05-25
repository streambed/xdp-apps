// Taken from: https://www.thethingsnetwork.org/forum/t/decode-float-sent-by-lopy-as-node/8757/2
// Extracts bytes from byte_payload from start to end
// and converts these bytes into a float
function extractFloat(byte_payload, start, end) {
  // extract bytes from payload, converting each byte into its unicode value
  var bytes = [];
  for(var i = start; i < end; i++) bytes.push(byte_payload[i].charCodeAt(0))
  // convert bytes to a float
  var bits = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
  var e = bits>>>23 & 0xff;
  var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);
  // return float in 2 decimal places
  return Math.round(float*100)/100;
}  

// Extract sensor data from the base64_payload
// The command flag inside the payload dictates what information was sent over.
function transform(time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);
  // If command flag == 1, extract the following information:
  // atmosphericPressure, xOrientation, yOrientation
  // If command flag == 0, extract the following information:
  // solar, precipitation, strikes, strikeDistance, windSpeed, windDirection, gustSpeed, airTemperature, vapourPressure, relativeHumidity
  if (commandFlag) {
    return [
      {outlet: 0, data: {time: time, nwkAddr: nwkAddr, atmosphericPressure: extractFloat(payload, 10, 14)}},
      {outlet: 1, data: {time: time, nwkAddr: nwkAddr, xOrientation: extractFloat(payload, 14, 18)}},
      {outlet: 2, data: {time: time, nwkAddr: nwkAddr, yOrientation: extractFloat(payload, 18, 22)}}]
  } else {
    return [
      {outlet: 3, data: {time: time, nwkAddr: nwkAddr, solar: extractFloat(payload, 10, 14)}},
      {outlet: 4, data: {time: time, nwkAddr: nwkAddr, precipitation: extractFloat(payload, 14, 18)}},
      {outlet: 5, data: {time: time, nwkAddr: nwkAddr, strikes: extractFloat(payload, 18, 22)}},
      {outlet: 6, data: {time: time, nwkAddr: nwkAddr, strikeDistance: extractFloat(payload, 22, 26)}},
      {outlet: 7, data: {time: time, nwkAddr: nwkAddr, windSpeed: extractFloat(payload, 26, 30)}},
      {outlet: 8, data: {time: time, nwkAddr: nwkAddr, windDirection: extractFloat(payload, 30, 34)}},
      {outlet: 9, data: {time: time, nwkAddr: nwkAddr, gustSpeed: extractFloat(payload, 34, 38)}},
      {outlet: 10, data: {time: time, nwkAddr: nwkAddr, airTemperature: extractFloat(payload, 38, 42)}},
      {outlet: 11, data: {time: time,nwkAddr: nwkAddr, vapourPressure: extractFloat(payload, 42, 46)}},
      {outlet: 12, data: {time: time, nwkAddr: nwkAddr, relativeHumidity: extractFloat(payload, 46, 50)}}]
  }
}

function test() {
  payload = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg==";
  var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload);
  return result[0].data.atmosphericPressure === 102.14;
}
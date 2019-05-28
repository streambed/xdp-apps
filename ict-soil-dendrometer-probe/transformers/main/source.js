/*******************************************************************************
 * 
 *  Transformation code for ICT Dendrometer & Soil Moisture Probe 
 * 
 * ****************************************************************************/

/**
 * Extracts bytes from byte_payload from start to end and converts these bytes 
 * into a float. Adapted from: 
 * https://www.thethingsnetwork.org/forum/t/decode-float-sent-by-lopy-as-node/8757/2
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
 */
function transform (time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);

  var decoded = [];
  if (commandFlag) {
    decoded.push (
      {outlet: 0, data: {time: time, nwkAddr: nwkAddr, 
        stemDiameter: extractFloat(payload, 10, 13)}},
      {outlet: 1, data: {time: time, nwkAddr: nwkAddr, 
        stemTemperature: extractFloat(payload, 14, 17)}}
    );
  } else {
    decoded.push (
      {outlet: 2, data: {time: time, nwkAddr: nwkAddr, 
        vwcCount: extractFloat(payload, 10, 13)}},
      {outlet: 3, data: {time: time, nwkAddr: nwkAddr, 
        temperature: extractFloat(payload, 14, 17)}},
      {outlet: 4, data: {time: time, nwkAddr: nwkAddr, 
        EC: extractFloat(payload, 18, 21)}},
      // Access 'decoded' array value for vwcCount stored in index 4 to 
      // calculate vwc.
      {outlet: 5, data: {time: time, nwkAddr: nwkAddr, 
        vwc: ((0.0003879 * decoded[2].data.vwcCount - 0.6956)*100)}})
    );
  }
  return decoded;
}

function test() {
  payload = "AAAHMRBqLy8BAUKKAABD0gAA=="; // Payload for command = true;
  var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload);
  return result;
  
  // payload = "AAAHMRBqLy8BAEecaoBCigAAQvYAAA=="; // Payload for command = false;
  // var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload);
  // return result;
}

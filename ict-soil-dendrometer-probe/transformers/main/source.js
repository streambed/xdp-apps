/*******************************************************************************
 * 
 *  Transformation code for ICT Dendrometer & Soil Moisture Probe 
 * 
 * ****************************************************************************/
const STEM_DIAMETER = 0;
const STEM_TEMPERATURE = 1;
const VWC_COUNT = 2;
const TEMPERATURE = 3;
const EC = 4;
const VWC = 5;

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

  // Return float unrounded
  return float*100/100;
}  

/**
 * Transforms base_64 payload into an array of objects, each specifying a
 * certain observation type.
 */
function transform (time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);
  var decoded = [];
  if (!commandFlag) {
    decoded.push (
      {outlet: STEM_DIAMETER, data: {time: time, nwkAddr: nwkAddr, 
        stemDiameter: extractFloat(payload, 10, 13)}},
      {outlet: STEM_TEMPERATURE, data: {time: time, nwkAddr: nwkAddr, 
        stemTemperature: extractFloat(payload, 14, 17)}}
    );
  } else {
    var vwcCount_decoded = extractFloat(payload, 10, 13);
    decoded.push (
      {outlet: VWC_COUNT, data: {time: time, nwkAddr: nwkAddr, 
        vwcCount: vwcCount_decoded}},
      {outlet: TEMPERATURE, data: {time: time, nwkAddr: nwkAddr, 
        temperature: extractFloat(payload, 14, 17)}},
      {outlet: EC, data: {time: time, nwkAddr: nwkAddr, 
        EC: extractFloat(payload, 18, 21)}},
      {outlet: VWC, data: {time: time, nwkAddr: nwkAddr, 
        vwc: ((0.0003879 * vwcCount_decoded - 0.6956)*100)}}
    );
  }
  return decoded;
}

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
      throw new Error(message);
    }
    throw message; // Fallback
  }
}
/**
 * Tests for the two possible payloads depending on command flag.
 */
function test() {
  // Dendrometer payload for command = 0;
  var payload_0 = "AAAHMRBqLy8BAELMR65CrzMz"; 
  var result_0 = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload_0);
  assert (result_0[STEM_DIAMETER].data.stemDiameter === 102.138671875, 
    'Expected stem diameter = 102.138671875');
  assert (result_0[STEM_TEMPERATURE].data.stemTemperature === 87.599609375, 
    'Expected stem tempreature = 87.599609375');
    
  // Soil moisture payload for command = 1;
  var payload_1 = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg=="; 
  var result_1 = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload_1);
  assert (result_1[VWC_COUNT - 2].data.vwcCount === 102.138671875, 
    'Expected vwcCount = 102.138671875');
  assert (result_1[TEMPERATURE - 2].data.temperature === 87.599609375, 
    'Expected temperature = 87.599609375');
  assert (result_1[EC - 2].data.EC === -86.19921875, 
    'Expected EC = -86.19921875');
  assert (result_1[VWC - 2].data.vwc === -65.59804091796875, 
    'Expected EC = -65.59804091796875');
  
  return 'Tests Passed!'
}
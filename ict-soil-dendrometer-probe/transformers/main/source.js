/*******************************************************************************
 * 
 *  Transformation code for ICT Dendrometer & Soil Moisture Probe 
 * 
 * ****************************************************************************/

// OUTLET DEFINITIONS
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
  var bits = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
  var e = bits>>>23 & 0xff;
  var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);

  // Return float unrounded
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
function transform (time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);
  if (commandFlag === 1) {
    return [
      {outlet: STEM_DIAMETER, data: {time: time, nwkAddr: nwkAddr, 
        stemDiameter: decodeFloat(payload, 10, 14)}},
      {outlet: STEM_TEMPERATURE, data: {time: time, nwkAddr: nwkAddr, 
        stemTemperature: decodeFloat(payload, 14, 18)}}
    ];
  } else {
    var vwcCount_decoded = decodeFloat(payload, 10, 14);
    return [
      {outlet: VWC_COUNT, data: {time: time, nwkAddr: nwkAddr, 
        vwcCount: vwcCount_decoded}},
      {outlet: TEMPERATURE, data: {time: time, nwkAddr: nwkAddr, 
        temperature: decodeFloat(payload, 14, 18)}},
      {outlet: EC, data: {time: time, nwkAddr: nwkAddr, 
        ec: decodeFloat(payload, 18, 22)}},
      {outlet: VWC, data: {time: time, nwkAddr: nwkAddr, 
        vwc: ((0.0003879 * vwcCount_decoded - 0.6956)*100)}}
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
// Dendrometer payload for command = 1.
function runTests1() {
  var payload_1 = "AAAHMRBqLy8BAULMR65CrzMz";
  var result_1 = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload_1);
  assert (result_1.length === 2, 
    'Expected command 1 array length = 2');
  assert (result_1[STEM_DIAMETER].data.stemDiameter === 102.13999938964844, 
    'Expected stem diameter = 102.13999938964844');
  assert (result_1[STEM_TEMPERATURE].data.stemTemperature === 87.5999984741211, 
    'Expected stem tempreature = 87.5999984741211');
}
// Soil moisture payload for command = 0.
function runTests0() {
  var payload_0 = "AAAHMRBqLy8BAELMR65CrzMzwqxmZg==";
  var result_0 = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload_0);
  assert(result_0.length === 4, 
    'Expected command 0 array length = 4');
  assert (result_0[VWC_COUNT - 2].data.vwcCount === 102.13999938964844, 
    'Expected vwcCount = 102.13999938964844');
  assert (result_0[TEMPERATURE - 2].data.temperature === 87.5999984741211, 
    'Expected temperature = 87.5999984741211');
  assert (result_0[EC - 2].data.ec === -86.19999694824219, 
    'Expected EC = -86.19999694824219');
  assert (result_0[VWC - 2].data.vwc === -65.59798942367554, 
    'Expected EC = -65.59798942367554');
}
/**
 * Tests for the two possible payloads types depending on command flag.
 */
function test() {
  runTests0();
  runTests1(); 
  return true;
}
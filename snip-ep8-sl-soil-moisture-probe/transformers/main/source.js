// Extracts 4 bytes from byte_payload given an offset and converts them to a float
function decodeFloat(bytes, offset) {
  const word = bytes.charCodeAt(offset) << 24 | bytes.charCodeAt(++offset) << 16 | bytes.charCodeAt(++offset) << 8 | bytes.charCodeAt(++offset);
  const sign = (word >>> 31 === 0) ? 1.0 : -1.0;
  const e = word >>> 23 & 0xff;
  const m = (e === 0) ? (word & 0x7fffff) << 1 : (word & 0x7fffff) | 0x800000;
  return sign * m * Math.pow(2, e - 150);
}

// Outlets
const MOISTURE = 0;
const TEMPERATURE = 1;

function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);

  if (fPort === 1 && payloadBytes.length >= (10 + 32)) {
    const com = payloadBytes.charCodeAt(9);
    if (com === 0) { // Moisture
      return [{
        outlet: MOISTURE, data: {
          "time": time, "nwkAddr": nwkAddr, "moisture": [
            decodeFloat(payloadBytes, 10),
            decodeFloat(payloadBytes, 14),
            decodeFloat(payloadBytes, 18),
            decodeFloat(payloadBytes, 22),
            decodeFloat(payloadBytes, 26),
            decodeFloat(payloadBytes, 30),
            decodeFloat(payloadBytes, 34),
            decodeFloat(payloadBytes, 38)
          ]
        }
      }];
    } else if (com === 1) { // Temperature
      return [{
        outlet: TEMPERATURE, data: {
          "time": time, "nwkAddr": nwkAddr, "temperature": [
            decodeFloat(payloadBytes, 10),
            decodeFloat(payloadBytes, 14),
            decodeFloat(payloadBytes, 18),
            decodeFloat(payloadBytes, 22),
            decodeFloat(payloadBytes, 26),
            decodeFloat(payloadBytes, 30),
            decodeFloat(payloadBytes, 34),
            decodeFloat(payloadBytes, 38)
          ]
        }
      }];
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function test() {
  var tests = {
    "moisture reading": [
      transform("2020-02-06T23:44:04.539Z", 65959, 1, "AAqwYxBrVFUDAAAAAAA/gAAAQAAAAEBJFocAAAAAP4AAAEAAAABASRaH"),
      [{ outlet: MOISTURE, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, moisture: [0, 1, 2, 3.1419999599456787, 0, 1, 2, 3.1419999599456787] } }]
    ],
    "temperature reading": [
      transform("2020-02-06T23:44:04.539Z", 65959, 1, "AAqwYxBrVFUDAQAAAAA/gAAAQAAAAEBJFocAAAAAP4AAAEAAAABASRaH"),
      [{ outlet: TEMPERATURE, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, temperature: [0, 1, 2, 3.1419999599456787, 0, 1, 2, 3.1419999599456787] } }]
    ]
  };

  var testFailures = Object
    .keys(tests)
    .map(function (test) {
      return { name: test, actual: JSON.stringify(tests[test][0]), expected: JSON.stringify(tests[test][1]) };
    })
    .filter(function (test) {
      return test.actual !== test.expected;
    });

  return testFailures.length === 0 ? true :
    "[" + testFailures[0].name + "] [" + testFailures[0].actual + "] did not equal expected value [" + testFailures[0].expected + "]";
}

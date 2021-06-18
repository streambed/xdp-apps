// Extracts 4 bytes from byte_payload given an offset and converts them to a float
function decodeFloat(bytes, offset) {
  const word = bytes.charCodeAt(offset) << 24 | bytes.charCodeAt(++offset) << 16 | bytes.charCodeAt(++offset) << 8 | bytes.charCodeAt(++offset);
  const sign = (word >>> 31 === 0) ? 1.0 : -1.0;
  const e = word >>> 23 & 0xff;
  const m = (e === 0) ? (word & 0x7fffff) << 1 : (word & 0x7fffff) | 0x800000;
  return sign * m * Math.pow(2, e - 150);
}

// Outlets
const BAROMETRIC_PRESSURE = 0;
const X_ORIENTATION = 1;
const Y_ORIENTATION = 2;
const SOLAR_RADIATION = 3;
const RAIN_GAUGE = 4;
const LIGHTNING_STRIKES = 5;
const LIGHTNING_STRIKE_DISTANCE = 6;
const WIND_SPEED = 7;
const WIND_DIRECTION = 8;
const GUST_SPEED = 9;
const AIR_TEMPERATURE = 10;
const VAPOUR_PRESSURE = 11;
const RELATIVE_HUMIDITY = 12;

function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);

  if (fPort === 1 && payloadBytes.length >= 2) {
    const header = payloadBytes.charCodeAt(1);
    if ((header & 0x40) === 0x40 && payloadBytes.length >= 18) {
      return [{
        outlet: RAIN_GAUGE, data: {
          "time": time, "nwkAddr": nwkAddr, "level": decodeFloat(payloadBytes, 14) * 0.2
        }
      }];
    } else if ((header & 0x80) === 0x80) {
      const com = header & 0x0f;
      if (com === 0 && payloadBytes.length >= 10) {
        return [{
          outlet: WIND_DIRECTION, data: {
            "time": time, "nwkAddr": nwkAddr, "windDirection": decodeFloat(payloadBytes, 2)
          }
        }, {
          outlet: WIND_SPEED, data: {
            "time": time, "nwkAddr": nwkAddr, "windSpeed": decodeFloat(payloadBytes, 6)
          }
        }];
      } else if (com === 1 && payloadBytes.length >= 10) {
        return [{
          outlet: AIR_TEMPERATURE, data: {
            "time": time, "nwkAddr": nwkAddr, "airTemperature": decodeFloat(payloadBytes, 2)
          }
        }, {
          outlet: RELATIVE_HUMIDITY, data: {
            "time": time, "nwkAddr": nwkAddr, "relativeHumidity": decodeFloat(payloadBytes, 6)
          }
        }];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function test() {
  var tests = {
    "wind reading": [
      transform("2020-02-06T23:44:04.539Z", 65959, 1, "E4BDqwAAPczMzQ=="),
      [{ outlet: WIND_DIRECTION, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, windDirection: 342 } }, { outlet: WIND_SPEED, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, windSpeed: 0.10000000149011612 } }]
    ],
    "air reading": [
      transform("2020-02-06T23:44:04.539Z", 65959, 1, "E4FBf4EGQidwpA=="),
      [{ outlet: AIR_TEMPERATURE, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, airTemperature: 15.968999862670898 } }, { outlet: RELATIVE_HUMIDITY, data: { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, relativeHumidity: 41.86000061035156 } }]
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

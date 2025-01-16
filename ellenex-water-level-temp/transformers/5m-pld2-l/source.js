function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);
  if (payloadBytes.length >= 7 && parseInt(payloadBytes.charCodeAt(2)) === 0) {
      const pressure = (
        (parseInt(payloadBytes.charCodeAt(3)) << 8) |
        (parseInt(payloadBytes.charCodeAt(4)))
      );
      const range = 5000.0; // Cable len
      const density = 1.0;  // A density of 1 is water
      const height = pressure / (1000.0 * density);
      const temp = ((
        (parseInt(payloadBytes.charCodeAt(5)) << 8) |
        (parseInt(payloadBytes.charCodeAt(6)))
      ) / 100.0) - (0.39 * range / 1000.0);
      return {"time": time, "nwkAddr": nwkAddr, "height": height, "temperature": temp};
  } else {
      return [];
  }
}

function test() {
  const tests = {
    "level and temp": [
      transform("2019-03-29T06:02:04.539Z", 65959, 15, "AD8AFiYJHSQ="),
      { time: "2019-03-29T06:02:04.539Z", nwkAddr: 65959, height: 5.670, temperature: 21.38 }
    ]
  };

  const testFailures = Object
    .keys(tests)
    .map(function(test) {
      return { name: test, actual: JSON.stringify(tests[test][0]), expected: JSON.stringify(tests[test][1]) };
    })
    .filter(function(test) {
      return test.actual !== test.expected;
    });

  return testFailures.length === 0 ? true :
    "[" + testFailures[0].name + "] [" + testFailures[0].actual + "] did not equal expected value [" + testFailures[0].expected + "]";
}

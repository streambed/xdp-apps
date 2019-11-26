function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);
  if (payloadBytes.length >= 5 && parseInt(payloadBytes.charCodeAt(2)) === 0) {
      const output = (
        (parseInt(payloadBytes.charCodeAt(3)) << 8) |
        (parseInt(payloadBytes.charCodeAt(4)))
      );
      const K = 0.01907;
      const m = 0.1985;
      const b = -0.0057;
      const pressure = (K * output * m) + b;
      return {"time": time, "nwkAddr": nwkAddr, "pressure": pressure};
  } else {
      return [];
  }
}

function test() {
  const tests = {
    "pressure": [
      transform("2019-03-29T06:02:04.539Z", 65959, 15, "AAAAA+g="),
      { time: "2019-03-29T06:02:04.539Z", nwkAddr: 65959, pressure: 3.7796950000000002 }
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

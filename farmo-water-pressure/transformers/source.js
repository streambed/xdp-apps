function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);
  if (payloadBytes.length >= 6) {
    const adc_ch0 = (
      (payloadBytes.charCodeAt(4) << 8) |
      (payloadBytes.charCodeAt(5))
    );
    const pressure = (((adc_ch0 / 1000) - 0.5) / 4) * 10;
    return { "time": time, "nwkAddr": nwkAddr, "pressure": pressure };
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "pressure": [
      transform("2022-03-08T06:02:04.539Z", 65959, 15, "DTYAAAH0AP////8="),
      { time: "2022-03-08T06:02:04.539Z", nwkAddr: 65959, pressure: 0 }
    ]
  };

  const testFailures = Object
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

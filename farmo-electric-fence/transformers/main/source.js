function transform(time, nwkAddr, fPort, payload) {
  var payloadBytes = atob(payload);
  if (payloadBytes.length >= 5 && payloadBytes.charCodeAt(0) == 0x58) {
    const voltage = (
      (parseInt(payloadBytes.charCodeAt(1)) << 24) |
      (parseInt(payloadBytes.charCodeAt(2)) << 16) |
      (parseInt(payloadBytes.charCodeAt(3)) << 8) |
      (parseInt(payloadBytes.charCodeAt(4)))
    );
    if ((voltage & 0x80000000) > 0) {
      voltage = voltage - 0x100000000;
    }
    return {
      time: time,
      nwkAddr: nwkAddr,
      voltage: voltage * 0.000001
    };
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "voltage": [
      transform("2022-03-02T00:00:00.000Z", 2, 1, "WAAc2jMAAA2B"),
      { time: "2022-03-02T00:00:00.000Z", nwkAddr: 2, voltage: 1.8908669999999999 }
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

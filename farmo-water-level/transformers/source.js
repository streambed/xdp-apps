function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);
  if (payloadBytes.length >= 5) {
    const vo = (
      (payloadBytes.charCodeAt(1) << 32) |
      (payloadBytes.charCodeAt(2) << 16) |
      (payloadBytes.charCodeAt(3) << 8) |
      (payloadBytes.charCodeAt(4))
    );
    const height = ((vo - 500) / 2) * 2;
    return { "time": time, "nwkAddr": nwkAddr, "height": height };
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "pressure": [
      transform("2022-03-08T06:02:04.539Z", 65959, 15, "UgAABtkAAA4o"),
      { time: "2022-03-08T06:02:04.539Z", nwkAddr: 65959, height: 1253 }
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

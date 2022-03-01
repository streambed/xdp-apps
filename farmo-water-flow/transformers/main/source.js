function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);

  if (payloadBytes.length >= 11) {
    const count1 = (
      (parseInt(payloadBytes.charCodeAt(9)) << 8) |
      (parseInt(payloadBytes.charCodeAt(10)))
    );
    const litresPerCount = 10;
    return { "time": time, "nwkAddr": nwkAddr, "flow15": count1 * litresPerCount };
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "reading one": [
      transform("2022-03-02T06:02:04.539Z", 65959, 15, "DT4AAAEWFAAAAGc="),
      { time: "2022-03-02T06:02:04.539Z", nwkAddr: 65959, flow15: 1030 }
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
/*
 * Transforms an ICT P-Node counter representing a count of the amount of 10L units of water
 * to pass through a flow meter within a 15 minute period.
 *
 * The record is laid out as follows:
 * 
 *  0  - 3   system time
 *  4  - 5   battery level
 *  6  - 9   big endian count 1
 * 10 - 13   big endian count 2
 * 14 - 17   big endian count 3
 * 18 - 21   big endian count 4
 */
function transform(time, nwkAddr, fPort, payload) {
  const payloadBytes = atob(payload);
  
  if (payloadBytes.length >= 10) {
    const count1 = (
      (parseInt(payloadBytes.charCodeAt(6)) << 24) | 
      (parseInt(payloadBytes.charCodeAt(7)) << 16) | 
      (parseInt(payloadBytes.charCodeAt(8)) << 8)  |
      (parseInt(payloadBytes.charCodeAt(9)))
    );
    const litresPerCount = 10;
    return {"time": time, "nwkAddr": nwkAddr, "flow15": count1 * litresPerCount};
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "reading one": [
      transform("2019-03-29T06:02:04.539Z", 65959, 15, "AAAAew1gAAAAHgAAAA8AAAATAAAAGQ=="),
      { time: "2019-03-29T06:02:04.539Z", nwkAddr: 65959, flow15: 300 }
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
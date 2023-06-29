function transform(time, nwkAddr, fPort, payload) {
  var payloadBytes = atob(payload);
  if (payloadBytes.length >= 7 && fPort == 2) {
    const vwc = (
      (parseInt(payloadBytes.charCodeAt(4)) << 8) |
      (parseInt(payloadBytes.charCodeAt(5)))
    );
    const temp = (
      (parseInt(payloadBytes.charCodeAt(6)) << 8) |
      (parseInt(payloadBytes.charCodeAt(7)))
    );
    return [{
      outlet: 0, data: {
		time: time,
      	nwkAddr: nwkAddr,
      	vwc: vwc * 0.0001
      }
    },
    {
      outlet: 1, data: {
        time: time,
      	nwkAddr: nwkAddr,
      	temperature: temp * 0.01
      }
    }];
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "voltage": [
      transform("2022-03-02T00:00:00.000Z", 2, 1, "DSMAAAg+CH0AHBA="),
      [
        {"outlet":0,"data":{"time":"2022-03-02T00:00:00.000Z","nwkAddr":2,"vwc":0.21100000000000002}},
        {"outlet":1,"data":{"time":"2022-03-02T00:00:00.000Z","nwkAddr":2,"temperature":21.73}}
      ]
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

function transform(time, nwkAddr, fPort, payload) {
  return {
    time: time,
    nwkAddr: nwkAddr,
    voltage: parseFloat(atob(payload))
  };
}

function test() {
  var tests = {
    "voltage of 10": [
      transform("2019-03-29T06:02:04.539Z", 65959, 15, "MTA="),
      { time: "2019-03-29T06:02:04.539Z", nwkAddr: 65959, voltage: 10 }
    ],

    "voltage of 5.5": [
      transform("2018-03-29T06:02:04.539Z", 62959, 12, "NS41"),
      { time: "2018-03-29T06:02:04.539Z", nwkAddr: 62959, voltage: 5.5 }
    ]
  };

  var testFailures = Object
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


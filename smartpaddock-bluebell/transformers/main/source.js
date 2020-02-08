function transform(time, nwkAddr, fPort, payload) {
  var payloadBytes = atob(payload);
  var version = parseInt(payloadBytes.charCodeAt(0));
  if (payloadBytes.length >= 15 && version === 0) {
 	var batteryVoltage = ((parseInt(payloadBytes.charCodeAt( 2)) <<  8) |  parseInt(payloadBytes.charCodeAt( 1))) / 1000;
    var temperature =    ((parseInt(payloadBytes.charCodeAt( 4)) <<  8) |  parseInt(payloadBytes.charCodeAt( 3))) / 10;
    var activity =        (parseInt(payloadBytes.charCodeAt( 6)) <<  8) |  parseInt(payloadBytes.charCodeAt( 5));
    var latitude =       ((parseInt(payloadBytes.charCodeAt(10)) << 24) | (parseInt(payloadBytes.charCodeAt( 9)) << 16) | (parseInt(payloadBytes.charCodeAt( 8)) << 8) | parseInt(payloadBytes.charCodeAt( 7))) / 10000000;
    var longitude =      ((parseInt(payloadBytes.charCodeAt(14)) << 24) | (parseInt(payloadBytes.charCodeAt(13)) << 16) | (parseInt(payloadBytes.charCodeAt(12)) << 8) | parseInt(payloadBytes.charCodeAt(11))) / 10000000;
    return {"time": time, "nwkAddr": nwkAddr, "position": {"lat": latitude, "lng": longitude}};
  } else {
    return [];
  }
}

function test() {
  var tests = {
    "reading one": [
      transform("2020-02-06T23:44:04.539Z", 65959, 1, "ADYNNgHzBaUtTPdUMeNOPXAIBhYNIQ=="),
      { time: "2020-02-06T23:44:04.539Z", nwkAddr: 65959, position: {lat: -14.6002523, lng: 132.3512148} }
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

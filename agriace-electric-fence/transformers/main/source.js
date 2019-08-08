function transform(time, nwkAddr, fPort, payload) {
  if (fPort === 1) {
    var payloadBytes = atob(payload);
    if (payloadBytes.length >= 1) {
      return {
        time: time,
        nwkAddr: nwkAddr,
        voltage: parseInt(payloadBytes.charCodeAt(0)) / 10
      };
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function test() {
  var result = transform("2019-04-12T00:00:00.000Z", 2, 1, "XwA=");
  return (
    result.time === "2019-04-12T00:00:00.000Z" &&
    result.nwkAddr === 2 &&
    result.voltage === 9.5
    );
}

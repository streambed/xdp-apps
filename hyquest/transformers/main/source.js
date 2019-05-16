function transform(time, nwkAddr, fPort, payload) {
  var tipCountIntervalMs = 5 * 60 * 1000; // ms represented per bucket (byte of payload)
  var tipBucketSize = 0.5;                // The volume represented by a tip bucket - in mm
  
  var epochTimeMs = (new Date(time)).getTime();
  var payloadBytes = atob(payload);
  var tipCountSpanMs = 0;
  var result = [];
  for (var i = payloadBytes.length - 1; i >= 0; --i) {
    var observation = {
      outlet: 0,
      data: {
        time: (new Date(epochTimeMs - tipCountSpanMs)).toISOString(),
        nwkAddr: nwkAddr,
        level: parseInt(payloadBytes.charCodeAt(i)) * tipBucketSize
      }
    };
    result.push(observation);
    tipCountSpanMs += tipCountIntervalMs;
  }
  return result;
}

function test() {
  var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, "AAEAAgD/")
  return (
    result.length===6 && 
    result[1].outlet===0 &&
    result[1].data.level===0 &&
    result[0].outlet===0 &&
    result[0].data.level===127.5
  );
}

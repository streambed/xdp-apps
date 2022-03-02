function readUInt32LE(bytes) {
  var value =
    (bytes.charCodeAt(3) << 24) + (bytes.charCodeAt(2) << 16) + (bytes.charCodeAt(1) << 8) + bytes.charCodeAt(0);
  return value & 0xffffffff;
}

function readInt32LE(bytes) {
  var ref = readUInt32LE(bytes);
  return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function transform(time, nwkAddr, fPort, payload) {
  const bytes = atob(payload);

  var decoded = {};

  if (bytes.length >= 2) {
    for (var i = 0; i < bytes.length;) {
      var channel_id = bytes.charCodeAt(i++);
      var channel_type = bytes.charCodeAt(i++);

      // BATTERY
      if (channel_id === 0x01 && channel_type === 0x75) {
        decoded.battery = bytes.charCodeAt(i);
        i += 1;
      }
      // VALVE 1
      else if (channel_id === 0x03 && channel_type == 0x01) {
        decoded.valve1 = bytes.charCodeAt(i) === 0 ? "off" : "on";
        i += 1;
      }
      // VALVE 2
      else if (channel_id === 0x05 && channel_type == 0x01) {
        decoded.valve2 = bytes.charCodeAt(i) === 0 ? "off" : "on";
        i += 1;
      }
      // VALVE 1 Pulse
      else if (channel_id === 0x04 && channel_type === 0xc8) {
        decoded.valve1_pulse = readUInt32LE(bytes.slice(i, i + 4));
        i += 4;
      }
      // VALVE 2 Pulse
      else if (channel_id === 0x06 && channel_type === 0xc8) {
        decoded.valve2_pulse = readUInt32LE(bytes.slice(i, i + 4));
        i += 4;
      } else {
        break;
      }
    }
  }

  if (decoded.valve1_pulse !== undefined) {
    const litresPerCount = 10;
    return { "time": time, "nwkAddr": nwkAddr, "flow15": decoded.valve1_pulse * litresPerCount };
  } else {
    return [];
  }
}

function test() {
  const tests = {
    "reading one": [
      transform("2022-03-02T06:02:04.539Z", 65959, 15, "AXVkAwEBBMgGAAAABQEABsgAAAAA"),
      { time: "2022-03-02T06:02:04.539Z", nwkAddr: 65959, flow15: 60 }
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
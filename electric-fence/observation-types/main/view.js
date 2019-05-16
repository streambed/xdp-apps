function(endDevice, latestObservation) {
  var color;

  if (latestObservation.data.voltage >= 5) {
    color = 'success';
  } else if (latestObservation.data.voltage >= 3) {
    color = 'warning';
  } else {
    color = 'danger';
  }

  return {
    observationsMapValue: 'voltage',
    observationsMapGauge: 'voltage',
    fields: {
      voltage: {
        value: latestObservation.data.voltage,
        name: 'Voltage',
        text: latestObservation.data.voltage.toFixed(1) + ' kV',
        color: color,
        scaleMin: 0,
        scaleMax: 6
      }
    }
  };
}

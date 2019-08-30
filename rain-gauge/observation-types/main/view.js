function(endDevice, latestObservation) {
  var color;

  if (latestObservation.data.level >= 20) {
    color = 'danger';
  } else if (latestObservation.data.level >= 10) {
    color = 'warning';
  } else {
    color = 'success';
  }

  return {
    observationsMapValue: 'level',
    observationsMapGauge: 'voltage',
    observationsMapWeight: 1,
    fields: {
      level: {
        value: latestObservation.data.level,
        name: 'Level',
        text: latestObservation.data.level.toFixed(1) + 'mm',
        color: color,
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

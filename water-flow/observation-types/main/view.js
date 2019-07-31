function(endDevice, latestObservation) {
  var color = 'danger';

  if (latestObservation.data.flow15 < 3250) {
    color = 'success';
  } else if (latestObservation.data.flow15 < 7500) {
    color = 'warning';
  }

  return {
    observationsMapValue: 'flow15',
    fields: {
      flow15: {
        value: latestObservation.data.flow15,
        name: '15min flow rate',
        text: latestObservation.data.flow15.toFixed(0) + 'L',
        color: color,
        scaleMin: 0,
        scaleMax: 10000
      }
    }
  };
}
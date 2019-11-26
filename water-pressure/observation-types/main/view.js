function(endDevice, latestObservation) {
  var color = 'danger';

  if (latestObservation.data.pressure >= 10) {
    color = 'success';
  } else if (latestObservation.data.pressure >= 9) {
    color = 'warning';
  }

  return {
    observationsMapValue: 'pressure',
    fields: {
      pressure: {
        value: latestObservation.data.pressure,
        name: 'pressure',
        text: latestObservation.data.pressure.toFixed(0) + 'bar',
        color: color,
        scaleMin: 0,
        scaleMax: 20
      }
    }
  };
}
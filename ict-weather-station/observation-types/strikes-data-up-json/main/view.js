function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'strikes',
    observationsMapGauge: 'strikes',
    fields: {
      strikes: {
        value: latestObservation.data.strikes,
        name: 'Strikes',
        text: latestObservation.data.strikes + ' strikes',
        color: latestObservation.data.strikes > 15 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}

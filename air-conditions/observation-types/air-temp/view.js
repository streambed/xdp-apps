function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'airTemperature',
    observationsMapGauge: 'airTemperature',
    observationsMapWeight: 2,
    fields: {
      airTemperature: {
        value: latestObservation.data.airTemperature,
        name: 'Air Temp',
        text: latestObservation.data.airTemperature.toFixed(2) + ' C',
        color: latestObservation.data.airTemperature > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}

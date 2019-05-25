function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'airTemperature',
    observationsMapGauge: 'airTemperature',
    fields: {
      airTemperature: {
        value: latestObservation.data.airTemperature,
        name: 'AirTemperature',
        text: latestObservation.data.airTemperature + ' C',
        color: latestObservation.data.airTemperature > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}

function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemTemperature',
    observationsMapGauge: 'stemTemperature',
    fields: {
      stemTemperature: {
        value: latestObservation.data.stemTemperature,
        name: 'stemTemperature',
        text: latestObservation.data.stemTemperature + ' C',
        color: latestObservation.data.stemTemperature > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}
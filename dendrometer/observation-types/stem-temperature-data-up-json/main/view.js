function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemTemperature',
    observationsMapGauge: 'stemTemperature',
    fields: {
      stemTemperature: {
        value: latestObservation.data.stemTemperature,
        name: 'stemTemperature',
        text: latestObservation.data.stemTemperature + ' °C',
        color: latestObservation.data.stemTemperature > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

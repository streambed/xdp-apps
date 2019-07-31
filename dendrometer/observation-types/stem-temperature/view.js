function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemTemperature',
    observationsMapGauge: 'stemTemperature',
    fields: {
      stemTemperature: {
        value: latestObservation.data.stemTemperature,
        name: 'Stem Temperature',
        text: latestObservation.data.stemTemperature.toFixed(2) + ' °C',
        color: latestObservation.data.stemTemperature > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemTemperature',
    observationsMapGauge: 'stemTemperature',
    fields: {
      stemTemperature: {
        value: round(latestObservation.data.stemTemperature, 2);
        name: 'stemTemperature',
        text: latestObservation.data.stemTemperature + ' °C',
        color: latestObservation.data.stemTemperature > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}


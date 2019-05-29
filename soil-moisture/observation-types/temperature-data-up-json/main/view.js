function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'temperature',
    observationsMapGauge: 'temperature',
    fields: {
      temperature: {
        value: round(latestObservation.data.temperature, 2),
        name: 'temperature',
        text: latestObservation.data.temperature + ' °C',
        color: latestObservation.data.temperature > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

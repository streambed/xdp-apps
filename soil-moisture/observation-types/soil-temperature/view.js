function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'temperature',
    observationsMapGauge: 'temperature',
    fields: {
      temperature: {
        value: latestObservation.data.temperature,
        name: 'temperature',
        text: latestObservation.data.temperature.toFixed(2) + ' °C',
        color: latestObservation.data.temperature > 60 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 80
      }
    }
  };
}

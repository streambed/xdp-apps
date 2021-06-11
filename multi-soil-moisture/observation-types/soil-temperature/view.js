function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'temperature',
    observationsMapGauge: 'temperature',
    fields: {
      temperature: {
        value: latestObservation.data.temperature,
        name: 'temperature',
        text: latestObservation.data.temperature[4].toFixed(2) + ' °C',
        color: latestObservation.data.temperature[4] > 60 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 80
      }
    }
  };
}

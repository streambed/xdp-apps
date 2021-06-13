function(endDevice, latestObservation) {
  const maxDepth = latestObservation.data.temperature.length;
  const referenceTemperature = (maxDepth > 0 ? latestObservation.data.temperature[maxDepth - 1].toFixed(2) : 0);
  return {
    observationsMapValue: 'temperature',
    observationsMapGauge: 'temperature',
    fields: {
      temperature: {
        value: latestObservation.data.temperature,
        name: 'temperature',
        text: referenceTemperature + '°C',
        color: 'success',
        scaleMin: 0,
        scaleMax: 50
      }
    }
  };
}

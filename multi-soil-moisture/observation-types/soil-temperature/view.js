function(endDevice, latestObservation) {
  const referenceTemperature = latestObservation.data.temperature[4].toFixed(2);
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

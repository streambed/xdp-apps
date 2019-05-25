function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'relativeHumidity',
    observationsMapGauge: 'relativeHumidity',
    fields: {
      relativeHumidity: {
        value: latestObservation.data.relativeHumidity,
        name: 'Relative Humidity',
        text: latestObservation.data.relativeHumidity + '',
        color: latestObservation.data.relativeHumidity > 0.5 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 1
      }
    }
  };
}

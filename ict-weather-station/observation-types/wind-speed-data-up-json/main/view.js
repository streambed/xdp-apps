function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'windSpeed',
    observationsMapGauge: 'windSpeed',
    fields: {
      windSpeed: {
        value: latestObservation.data.windSpeed,
        name: 'Wind Speed',
        text: latestObservation.data.windSpeed + ' km/h',
        color: latestObservation.data.windSpeed > 60 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

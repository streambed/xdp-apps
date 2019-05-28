function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'windDirection',
    observationsMapGauge: 'windDirection',
    fields: {
      windDirection: {
        value: latestObservation.data.windDirection,
        name: 'Wind Direction',
        text: latestObservation.data.windDirection.toFixed(2) + ' deg',
        scaleMin: -180,
        scaleMax: 180
      }
    }
  };
}

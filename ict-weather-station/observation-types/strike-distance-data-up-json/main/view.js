function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'strikeDistance',
    observationsMapGauge: 'strikeDistance',
    fields: {
      strikeDistance: {
        value: latestObservation.data.strikeDistance,
        name: 'Strike Distance',
        text: latestObservation.data.strikeDistance + ' m',
        color: latestObservation.data.strikeDistance > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}

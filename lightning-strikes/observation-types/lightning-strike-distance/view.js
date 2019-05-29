function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'lightningStrikeDistance',
    observationsMapGauge: 'lightningStrikeDistance',
    fields: {
      lightningStrikeDistance: {
        value: latestObservation.data.lightningStrikeDistance,
        name: 'Lightning Strike Distance',
        text: latestObservation.data.lightningStrikeDistance.toFixed(2) + ' km',
        color: latestObservation.data.lightningStrikeDistance > 5 ? 'success' : 'danger',
        scaleMin: 0,
        scaleMax: 40
      }
    }
  };
}

function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'lightningStrikes',
    observationsMapGauge: 'lightningStrikes',
    fields: {
      lightningStrikes: {
        value: latestObservation.data.lightningStrikes,
        name: 'Lightning Strikes',
        text: latestObservation.data.lightningStrikes.toFixed(2) + ' strikes',
        color: latestObservation.data.lightningStrikes > 15 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}

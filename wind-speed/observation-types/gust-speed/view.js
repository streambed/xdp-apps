function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'gustSpeed',
    observationsMapGauge: 'gustSpeed',
    fields: {
      gustSpeed: {
        value: latestObservation.data.gustSpeed,
        name: 'GustSpeed',
        text: latestObservation.data.gustSpeed.toFixed(2) + ' km/h',
        color: latestObservation.data.gustSpeed > 15 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'precipitation',
    observationsMapGauge: 'precipitation',
    fields: {
      precipitation: {
        value: latestObservation.data.precipitation,
        name: 'precipitation',
        text: latestObservation.data.precipitation.toFixed(2) + ' mm',
        color: latestObservation.data.precipitation > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 300
      }
    }
  };
}

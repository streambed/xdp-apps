function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'moisture',
    observationsMapGauge: 'moisture',
    fields: {
      temperature: {
        value: latestObservation.data.moisture,
        name: 'moisture',
        text: latestObservation.data.moisture[4].toFixed(2) + 'VWC%',
        color: latestObservation.data.moisture[4] > 80 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

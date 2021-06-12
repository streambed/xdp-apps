function(endDevice, latestObservation) {
  const referenceMoisture = ((latestObservation.data.moisture[4]) * 100).toFixed(2);
  return {
    observationsMapValue: 'moisture',
    observationsMapGauge: 'moisture',
    fields: {
      moisture: {
        value: latestObservation.data.moisture,
        name: 'moisture',
        text: referenceMoisture + 'VWC%',
        color: 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

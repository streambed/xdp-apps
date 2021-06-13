function(endDevice, latestObservation) {
  const maxDepth = latestObservation.data.moisture.length;
  const referenceMoisture = (maxDepth > 0 ? latestObservation.data.moisture[maxDepth - 1].toFixed(2) : 0);
  return {
    observationsMapValue: 'moisture',
    observationsMapGauge: 'moisture',
    fields: {
      moisture: {
        value: latestObservation.data.moisture,
        name: 'Moisture',
        text: referenceMoisture + 'VWC%',
        color: 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

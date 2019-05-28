function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'yOrientation',
    observationsMapGauge: 'yOrientation',
    fields: {
      yOrientation: {
        value: latestObservation.data.yOrientation,
        name: 'YOrientation',
        text: latestObservation.data.yOrientation.toFixed(2) + ' deg',
        color: latestObservation.data.yOrientation > -180 ? 'danger' : 'success',
        scaleMin: -180,
        scaleMax: 180
      }
    }
  };
}

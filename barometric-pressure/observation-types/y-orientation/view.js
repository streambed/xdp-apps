function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'yOrientation',
    observationsMapGauge: 'yOrientation',
    fields: {
      yOrientation: {
        value: latestObservation.data.yOrientation,
        name: 'Tilt',
        text: latestObservation.data.yOrientation.toFixed(2) + ' deg',
        color: latestObservation.data.yOrientation > 90 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 180
      }
    }
  };
}

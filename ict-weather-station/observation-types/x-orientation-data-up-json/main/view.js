function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'xOrientation',
    observationsMapGauge: 'xOrientation',
    fields: {
      xOrientation: {
        value: latestObservation.data.xOrientation,
        name: 'XOrientation',
        text: latestObservation.data.xOrientation.toFixed(2) + ' deg',
        color: latestObservation.data.xOrientation > -180 ? 'danger' : 'success',
        scaleMin: -180,
        scaleMax: 180
      }
    }
  };
}

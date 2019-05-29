function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'xOrientation',
    observationsMapGauge: 'xOrientation',
    fields: {
      xOrientation: {
        value: latestObservation.data.xOrientation,
        name: 'Compass Heading',
        text: latestObservation.data.xOrientation.toFixed(2) + ' deg',
        color: latestObservation.data.xOrientation > 180 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 359
      }
    }
  };
}

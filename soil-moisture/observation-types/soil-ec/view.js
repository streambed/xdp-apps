function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'EC',
    observationsMapGauge: 'EC',
    fields: {
      EC: {
        value: latestObservation.data.ec,
        name: 'EC',
        text: latestObservation.data.ec.toFixed(2) + ' dS/m',
        color: latestObservation.data.ec > 20 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

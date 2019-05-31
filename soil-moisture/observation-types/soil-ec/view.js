function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'EC',
    observationsMapGauge: 'EC',
    fields: {
      EC: {
        value: latestObservation.data.EC,
        name: 'EC',
        text: latestObservation.data.EC.toFixed(2) + ' dS/m',
        color: latestObservation.data.EC > 20 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

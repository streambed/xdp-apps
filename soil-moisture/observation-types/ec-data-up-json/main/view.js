function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'EC',
    observationsMapGauge: 'EC',
    fields: {
      EC: {
        value: latestObservation.data.EC,
        name: 'EC',
        text: latestObservation.data.EC + ' mS/m',
        color: latestObservation.data.EC > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

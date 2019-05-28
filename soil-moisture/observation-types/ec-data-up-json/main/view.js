function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'EC',
    observationsMapGauge: 'EC',
    fields: {
      EC: {
        value: latestObservation.data.EC,
        name: 'EC',
        text: latestObservation.data.EC,
        color: latestObservation.data.EC > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}
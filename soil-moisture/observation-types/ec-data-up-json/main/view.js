function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'EC',
    observationsMapGauge: 'EC',
    fields: {
      EC: {
        value: round(latestObservation.data.EC, 2),
        name: 'EC',
        text: latestObservation.data.EC + ' mS/m',
        color: latestObservation.data.EC > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

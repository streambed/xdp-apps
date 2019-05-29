function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemDiameter',
    observationsMapGauge: 'stemDiameter',
    fields: {
      stemDiameter: {
        value: round(latestObservation.data.stemDiameter, 2),
        name: 'stemDiameter',
        text: latestObservation.data.stemDiameter + ' cm',
        color: latestObservation.data.stemDiameter > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}

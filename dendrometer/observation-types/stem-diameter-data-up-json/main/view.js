function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'stemDiameter',
    observationsMapGauge: 'stemDiameter',
    fields: {
      stemDiameter: {
        value: latestObservation.data.stemDiameter,
        name: 'stemDiameter',
        text: latestObservation.data.stemDiameter + ' cm',
        color: latestObservation.data.stemDiameter > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}
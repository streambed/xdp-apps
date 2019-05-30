function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'barometricPressure',
    observationsMapGauge: 'barometricPressure',
    fields: {
      barometricPressure: {
        value: latestObservation.data.barometricPressure,
        name: 'barometricPressure',
        text: latestObservation.data.barometricPressure.toFixed(2) + ' kPa',
        color: latestObservation.data.barometricPressure > 90 ? 'danger' : 'success',
        scaleMin: 50,
        scaleMax: 110
      }
    }
  };
}

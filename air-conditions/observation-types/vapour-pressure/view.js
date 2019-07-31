function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vapourPressure',
    observationsMapGauge: 'vapourPressure',
    fields: {
      vapourPressure: {
        value: latestObservation.data.vapourPressure,
        name: 'Vapour Pressure',
        text: latestObservation.data.vapourPressure.toFixed(2) + ' kPa',
        color: latestObservation.data.vapourPressure > 10 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

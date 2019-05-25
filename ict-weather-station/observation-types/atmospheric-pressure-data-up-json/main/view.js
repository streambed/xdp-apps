function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'atmosphericPressure',
    observationsMapGauge: 'atmosphericPressure',
    fields: {
      atmosphericPressure: {
        value: latestObservation.data.atmosphericPressure,
        name: 'AtmosphericPressure',
        text: latestObservation.data.atmosphericPressure + ' kPa',
        color: latestObservation.data.atmosphericPressure > 700 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 1000
      }
    }
  };
}

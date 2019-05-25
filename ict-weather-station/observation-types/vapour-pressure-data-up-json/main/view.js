function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vapourPressure',
    observationsMapGauge: 'vapourPressure',
    fields: {
      vapourPressure: {
        value: latestObservation.data.vapourPressure,
        name: 'VapourPressure',
        text: latestObservation.data.vapourPressure + ' kPa',
        color: latestObservation.data.vapourPressure > 10 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 30
      }
    }
  };
}

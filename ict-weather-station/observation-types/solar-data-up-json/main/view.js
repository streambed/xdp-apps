function(endDevice, latestObservation) {
    return {
      observationsMapValue: 'solar',
      observationsMapGauge: 'solar',
      fields: {
        solar: {
          value: latestObservation.data.solar,
          name: 'solar',
          text: latestObservation.data.solar + ' units',
          color: latestObservation.data.solar > 30 ? 'danger' : 'success',
          scaleMin: 0,
          scaleMax: 45
        }
      }
    };
}
  
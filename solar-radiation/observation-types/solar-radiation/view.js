function(endDevice, latestObservation) {
    return {
      observationsMapValue: 'solarRadiation',
      observationsMapGauge: 'solarRadiation',
      fields: {
        solarRadiation: {
          value: latestObservation.data.solarRadiation,
          name: 'solarRadiation',
          text: latestObservation.data.solarRadiation.toFixed(2) + ' units',
          color: latestObservation.data.solarRadiation > 1500 ? 'danger' : 'success',
          scaleMin: 0,
          scaleMax: 1750
        }
      }
    };
}
  
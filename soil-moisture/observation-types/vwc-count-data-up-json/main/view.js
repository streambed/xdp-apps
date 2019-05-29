function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vwcCount',
    observationsMapGauge: 'vwcCount',
    fields: {
      vwc: {
        value: latestObservation.data.vwcCount,
        name: 'vwcCount',
        text: latestObservation.data.vwcCount,
        color: latestObservation.data.vwcCount > 300 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 500
      }
    }
  };
}

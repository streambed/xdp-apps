function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vwc',
    observationsMapGauge: 'vwc',
    fields: {
      vwc: {
        value: latestObservation.data.vwc,
        name: 'vwcCount',
        text: latestObservation.data.vwc + ' θv',
        color: latestObservation.data.vwc > 50 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}

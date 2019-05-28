function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vwc',
    observationsMapGauge: 'vwc',
    fields: {
      vwc: {
        value: latestObservation.data.vwc,
        name: 'vwcCount',
        text: latestObservation.data.vwc,
        color: latestObservation.data.vwc > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vwc',
    observationsMapGauge: 'vwc',
    fields: {
      vwc: {
        value: latestObservation.data.vwc,
        name: 'vwcCount',
        text: latestObservation.data.vwc.toFixed(2) + ' m³/m³',
        color: latestObservation.data.vwc > 0.7 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 1
      }
    }
  };
}

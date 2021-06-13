function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vwcCount',
    observationsMapGauge: 'vwcCount',
    fields: {
      vwcCount: {
        value: latestObservation.data.vwcCount,
        name: 'VWC Count',
        text: latestObservation.data.vwcCount.toFixed(2),
        color: latestObservation.data.vwcCount > 300 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 500
      }
    }
  };
}

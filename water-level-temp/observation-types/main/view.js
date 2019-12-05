function(endDevice, latestObservation) {
  var color = 'danger';
  var tempColor = 'danger';

  if (latestObservation.data.height > 1000) {
    color = 'success';
  } else if (latestObservation.data.height > 400) {
    color = 'warning';
  }

  if (latestObservation.data.temperature < 25) {
    tempColor = 'success';
  } else if (latestObservation.data.temperature < 35) {
    tempColor = 'warning';
  }

  return {
    observationsMapValue: 'height',
    observationsMapGauge: 'temperature',
    fields: {
      height: {
        value: latestObservation.data.height,
        name: 'Height',
        text: latestObservation.data.height.toFixed(0) + 'mm',
        color: color,
        scaleMin: 0,
        scaleMax: 5500
      },
      temperature: {
        value: latestObservation.data.temperature,
        name: 'Temperature',
        text: latestObservation.data.temperature.toFixed(1) + '°C',
        color: tempColor,
        scaleMin: 0,
        scaleMax: 50
      }
    }
  };
}

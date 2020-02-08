function(endDevice, latestObservation) {
  return {
    fields: {
      position: {
        name: "Cattle movement",
        value: latestObservation.position,
        text: latestObservation.position.lat + "," + latestObservation.position.lng,
        color: "success",
        unit: "lat/lng"
      }
    },

    observationsMapValue: "position",

    observationsMapGauge: "position"
  };
}

function() {
  return {
    panels: {
      latestRain: {
        title: 'Latest Rain Gauge Readings',
        type: 'ObservationCard',
        data: {
          topic: 'rain-gauge-data-up-json',
          field: 'level'
        }
      }

    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", size: 6, entries: ["latestRain"]}
          ]}
        ]}
      ]}
    ]
  };
}

function() {
  return {
    panels: {
      latestVoltage: {
        title: 'Latest Electric Fence Readings',
        type: 'ObservationCard',
        data: {
          topic: 'electric-fence-data-up-json',
          field: 'voltage'
        }
      },

      historicalVoltage: {
        title: 'Electric Fence Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'electric-fence-data-up-json',
          field: 'voltage'
        }
      }

    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", size: 6, entries: ["latestVoltage"]}
          ]}
        ]},
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", entries: ["historicalVoltage"]}
          ]}
        ]}
      ]}
    ]
  };
}

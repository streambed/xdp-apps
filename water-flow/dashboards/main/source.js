function() {
    return {
      panels: {
        historicalWaterFlow: {
          title: 'Historical Water Flow',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'water-flow-data-up-json',
            field: 'flow15'
          }
        }
      },
      layout: [
        { type: "row", entries: [
          { type: "col", size: 6, entries: ["historicalWaterFlow"] }
        ]}
      ]
    };
  }
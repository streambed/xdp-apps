function() {
  return {
    panels: {
      latestSolar: {
        title: 'Latest Solar',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'solar-data-up-json',
          field: 'solar'
        }
      },
      
      historicalSolar: {
        title: 'Solar Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'solar-data-up-json',
          field: 'solar'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestSolar"] },
        { type: "col", size: 8, entries: ["historicalSolar"] }
        
      ]}
    ]
  };
}
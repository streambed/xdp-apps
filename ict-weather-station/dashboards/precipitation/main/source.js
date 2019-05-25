
function() {
  return {
    panels: {
      latestPrecipitation: {
        title: 'Latest Precipitation',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'precipitation-data-up-json',
          field: 'precipitation'
        }
      },
      
      historicalPrecipitation: {
        title: 'Precipitation Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'precipitation-data-up-json',
          field: 'precipitation'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestPrecipitation"] },
        { type: "col", size: 8, entries: ["historicalPrecipitation"] }
        
      ]}
    ]
  };
}
function() {
  return {
    panels: {
      latestSolarRadiation: {
        title: 'Latest Solar Radiation Reading',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'solar-radiation-data-up-json',
          field: 'solarRadiation'
        }
      },
      
      historicalSolarRadiation: {
        title: 'Solar Radiation Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'solar-radiation-data-up-json',
          field: 'solarRadiation'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestSolarRadiation"] },
        { type: "col", size: 8, entries: ["historicalSolarRadiation"] }
        
      ]}
    ]
  };
}
function() {
  return {
    panels: {
      stemDiameter: {
        title: 'Stem Diameter',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'stem-diameter-data-up-json',
          field: 'diameter'
        }
      },
      latestStemTemperature: {
        title: 'Latest Stem Temperature',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'stem-diameter-data-up-json',
          field: 'temperature'
        }
      },
      historicalStemTemperature: {
      	title: 'Stem Temperature History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'stem-temperature-data-up-json',
          field: 'temperature'
        }
      },
    },
    layout: [
      { type: "row", entries: [
        { type: "col", size: 3, entries: ["stemDiameter"]},
        { type: "col", size: 3, entries: ["latestStemTemperature"]},
        { type: "col", size: 6, entries: ["historicalStemTemperature"]},
      ]}
    ]
  };
}
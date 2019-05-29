function() {
  return {
    panels: {
      latestStemDiameter: {
        title: 'Stem Diameter',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'stem-diameter-data-up-json',
          field: 'diameter'
        }
      },
      historicalStemDiameter: {
        title: 'Stem Diameter History',
        type: 'ObservationTimeSeriesCard',
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
        { type: "col", size: 4, entries: ["latestStemDiameter"]},
        { type: "col", size: 8, entries: ["historicalStemDiameter"]}
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestStemTemperature"]},
        { type: "col", size: 8, entries: ["historicalStemTemperature"]},
      ]}
    ]
  };
}

function() {
  return {
    panels: {
      latestStemDiameter: {
        title: 'Latest Stem Diameter',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'stem-diameter-data-up-json',
          field: 'stemDiameter'
        }
      },
      historicalStemDiameter: {
        title: 'Stem Diameter History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'stem-diameter-data-up-json',
          field: 'stemDiameter'
        }
      },
      latestStemTemperature: {
        title: 'Latest Stem Temperature',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'stem-temperature-data-up-json',
          field: 'stemTemperature'
        }
      },
      historicalStemTemperature: {
      	title: 'Stem Temperature History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'stem-temperature-data-up-json',
          field: 'stemTemperature'
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

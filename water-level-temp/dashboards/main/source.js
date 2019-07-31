function() {
  return {
    panels: {
      latestWaterHeightBar: {
        title: 'Latest Water Level',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'waterstate-data-up-json',
          field: 'height'
        }
      },

      historicalWater: {
        title: 'Water Levels',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'waterstate-data-up-json',
          field: 'height'
        }
      },

    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", entries: ["latestWaterHeightBar"]}
          ]}
        ]},
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", entries: ["historicalWater"]}
          ]}
        ]}
      ]}
    ]
  };
}

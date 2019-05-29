function() {
  return {
    panels: {
      latestVwcCount: {
        title: 'Latest VWC Count',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'vwc-count-data-up-json',
          field: 'vwcCount'
        }
      },
      historicalVwcCount: {
        title: 'VWC Count History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'vwc-count-data-up-json',
          field: 'vwcCount'
        }
      },
      latestVwc: {
        title: 'Latest VWC',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'vwc-data-up-json',
          field: 'vwc'
        }
      },
      historicalVwc: {
        title: 'VWC History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'vwc-data-up-json',
          field: 'vwc'
        }
      },
      latestTemperature: {
        title: 'Latest Soil Temperature',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'temperature-data-up-json',
          field: 'temperature'
        }
      },
      historicalTemperature: {
        title: 'Soil Temperature History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'temperature-data-up-json',
          field: 'temperature'
        }
      },
      latestEC: {
        title: 'Latest Soil EC',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'ec-data-up-json',
          field: 'EC'
        }
      },
      historicalEC: {
        title: 'Soil EC History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'ec-data-up-json',
          field: 'EC'
        }
      },
    },
    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestVwcCount"]},
        { type: "col", size: 8, entries: ["historicalVwcCount"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestVwc"]},
        { type: "col", size: 8, entries: ["historicalVwc"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestTemperature"]},
        { type: "col", size: 8, entries: ["historicalTemperature"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestEC"]},
        { type: "col", size: 8, entries: ["historicalEC"]},
      ]}
    ]
  };
}

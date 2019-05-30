function() {
    return {
      panels: {
        latestAirTemperature: {
          title: 'Latest Air Temperature',
          type: 'ObservationBarChartCard',
          data: {
            topic: 'air-temp-data-up-json',
            field: 'airTemperature'
          }
        },
        historicalAirTemperature: {
          title: 'Historical Air Temperature',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'air-temp-data-up-json',
            field: 'airTemperature'
          }
        },
        latestVapourPressure: {
          title: 'Latest Vapour Pressure',
          type: 'ObservationBarChartCard',
          data: {
            topic: 'vapour-pressure-data-up-json',
            field: 'vapourPressure'
          }
        },
        historicalVapourPressure: {
          title: 'Latest Vapour Pressure',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'vapour-pressure-data-up-json',
            field: 'vapourPressure'
          }
        },
        latestRelativeHumidity: {
          title: 'Latest Relative Humidity',
          type: 'ObservationBarChartCard',
          data: {
            topic: 'relative-humidity-data-up-json',
            field: 'relativeHumidity'
          }
        },
        historicalRelativeHumidity: {
          title: 'Latest Relative Humidity',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'relative-humidity-data-up-json',
            field: 'relativeHumidity'
          }
        },
      },
  
      layout: [
        { type: "row", entries: [
          { type: "col", size: 4, entries: ["latestAirTemperature"]},
          { type: "col", size: 8, entries: ["historicalAirTemperature"]},
        ]},
        { type: "row", entries: [
          { type: "col", size: 4, entries: ["latestVapourPressure"]},
          { type: "col", size: 8, entries: ["historicalVapourPressure"]},
        ]},
        { type: "row", entries: [
          { type: "col", size: 4, entries: ["latestRelativeHumidity"]},
          { type: "col", size: 8, entries: ["historicalRelativeHumidity"]},
        ]}
      ]
    };
  }
  
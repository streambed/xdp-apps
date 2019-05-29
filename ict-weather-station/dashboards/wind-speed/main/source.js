function() {
  return {
    panels: {
      latestWindSpeed: {
        title: 'Latest Wind Speed',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'wind-speed-data-up-json',
          field: 'windSpeed'
        }
      },
      historicalWindSpeedGraph: {
        title: 'Wind Speed History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'wind-speed-data-up-json',
          field: 'windSpeed'
        }
      },
      latestWindDirection: {
        title: 'Latest Wind Direction',
        type: 'ObservationCard',
        data: {
          topic: 'wind-direction-data-up-json',
          field: 'windDirection'
        }
      },
      historicalWindDirection: {
        title: 'Latest Wind Direction',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'wind-direction-data-up-json',
          field: 'windDirection'
        }
      },
      historicalGustSpeedGraph: {
        title: 'Gust Speed History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'gust-speed-data-up-json',
          field: 'gustSpeed'
        }
      },
      latestGustSpeed: {
        title: 'Latest Gust Speed',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'gust-speed-data-up-json',
          field: 'gustSpeed'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestWindSpeed"]},
        { type: "col", size: 8, entries: ["historicalWindSpeedGraph"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestWindDirection"]},
        { type: "col", size: 8, entries: ["historicalWindDirection"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestGustSpeed"]},
        { type: "col", size: 8, entries: ["historicalGustSpeedGraph"]},
        
      ]}
    ]
  };
}

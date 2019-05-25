function() {
  return {
    panels: {
      latestStrikes: {
        title: 'Latest Strikes',
        type: 'ObservationCard',
        data: {
          topic: 'strikes-data-up-json',
          field: 'strikes'
        }
      },
      latestStrikeDistance: {
        title: 'Latest Strike Distance',
        type: 'ObservationCard',
        data: {
          topic: 'strike-distance-data-up-json',
          field: 'strikeDistance'
        }
      },
      historicalStrikes: {
        title: 'Strikes History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'strikes-data-up-json',
          field: 'strikes'
        }
      },
      historicalStrikeDistance: {
        title: 'Strike Distance History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'strike-distance-data-up-json',
          field: 'strikeDistance'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestStrikes"]},
        { type: "col", size: 8, entries: ["historicalStrikes"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestStrikeDistance"]},
        { type: "col", size: 8, entries: ["historicalStrikeDistance"]},
      ]}
    ]
  };
}

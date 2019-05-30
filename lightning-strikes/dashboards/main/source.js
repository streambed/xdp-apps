function() {
  return {
    panels: {
      latestLightningStrikes: {
        title: 'Latest Lightning Strikes',
        type: 'ObservationCard',
        data: {
          topic: 'lightning-strikes-data-up-json',
          field: 'lightningStrikes'
        }
      },
      latestLightningStrikeDistance: {
        title: 'Latest Lightning Strike Distance',
        type: 'ObservationCard',
        data: {
          topic: 'lightning-strike-distance-data-up-json',
          field: 'lightningStrikeDistance'
        }
      },
      historicalLightningStrikes: {
        title: 'Lightning Strikes History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'lightning-strikes-data-up-json',
          field: 'lightningStrikes'
        }
      },
      historicalLightningStrikeDistance: {
        title: 'Lightning Strike Distance History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'lightning-strike-distance-data-up-json',
          field: 'lightningStrikeDistance'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestLightningStrikes"]},
        { type: "col", size: 8, entries: ["historicalLightningStrikes"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestLightningStrikeDistance"]},
        { type: "col", size: 8, entries: ["historicalLightningStrikeDistance"]},
      ]}
    ]
  };
}

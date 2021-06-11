function() {
  return {
    panels: {
      latestMoisture: {
        title: 'Latest Moisture',
        type: 'ObservationCard',
        data: {
          topic: 'multi-soil-temperature-data-up-json',
          field: 'moisture'
        }
      },
      historicalMoisture: {
        title: 'Moisture History',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'multi-soil-temperature-data-up-json',
          field: 'moisture'
        }
      }
    },
    layout: [
      {
        type: 'row', entries: [
          { type: 'col', size: 4, entries: ['latestMoisture'] },
          { type: 'col', size: 8, entries: ['historicalMoisture'] },
        ]
      }
    ]
  };
}

function() {
  return {
    panels: {
      latestAtmosphericPressure: {
        title: 'Latest Atmospheric Pressure',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'atmospheric-pressure-data-up-json',
          field: 'atmosphericPressure'
        }
      },
      
      historicalAtmosphericPressure: {
        title: 'Atmospheric Pressure Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'atmospheric-pressure-data-up-json',
          field: 'atmosphericPressure'
        }
      }, 
      
      latestXOrientation: {
        title: 'Latest X Orientation',
        type: 'ObservationCard',
        data: {
          topic: 'x-orientation-data-up-json',
          field: 'xOrientation'
        }
      }, 
      
      latestYOrientation: {
        title: 'Latest Y Orientation',
        type: 'ObservationCard',
        data: {
          topic: 'y-orientation-data-up-json',
          field: 'yOrientation'
        }
      }
        
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 6, entries: ["latestXOrientation"] },
        { type: "col", size: 6, entries: ["latestYOrientation"] } 
      ]},
      { type: "row", entries: [
        { type: "col", size: 6, entries: ["latestAtmosphericPressure"] },
        { type: "col", size: 6, entries: ["historicalAtmosphericPressure"] } 
      ]}
    ]
  };
}
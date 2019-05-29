function() {
  return {
    panels: {
      latestBarometricPressure: {
        title: 'Latest Barometric Pressure',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'barometric-pressure-data-up-json',
          field: 'barometricPressure'
        }
      },
      
      historicalBarometricPressure: {
        title: 'Barometric Pressure Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'barometric-pressure-data-up-json',
          field: 'barometricPressure'
        }
      }, 
      
      latestXOrientation: {
        title: 'Compass Heading',
        type: 'ObservationCard',
        data: {
          topic: 'x-orientation-data-up-json',
          field: 'xOrientation'
        }
      }, 
      
      latestYOrientation: {
        title: 'Tilt',
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
        { type: "col", size: 6, entries: ["latestBarometricPressure"] },
        { type: "col", size: 6, entries: ["historicalBarometricPressure"] } 
      ]}
    ]
  };
}
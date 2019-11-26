function() {
    return {
      panels: {
        historicalWaterPressure: {
          title: 'Historical Water Pressure',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'water-pressure-data-up-json',
            field: 'pressure',
            plotType: 'area',
            aggregate: function(topic, observations) {
              let minPressure = 0.0;
              for (let i = observations.length - 1; i >= 0; --i) {
                const o = observations[i];
                if (typeof o.pressure === 'number' && o.pressure >= 0.0 && o.pressure < 100000000.0) {
                  if (minPressure == undefined || o.pressure < minPressure) {
                    minPressure = o.pressure;
                  }
                }
              }

              return {
                pressure: minPressure
              };
            }
          }
        }
      },
      layout: [
        { type: "row", entries: [
          { type: "col", size: 6, entries: ["historicalWaterPressure"] }
        ]}
      ]
    };
  }

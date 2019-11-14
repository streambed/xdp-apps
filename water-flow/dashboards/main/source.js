function() {
    return {
      panels: {
        historicalWaterFlow: {
          title: 'Historical Water Flow',
          type: 'ObservationTimeSeriesCard',
          data: {
            topic: 'water-flow-data-up-json',
            field: 'flow15',
            plotType: 'area',
            aggregate: function(topic, observations) {
              let maxFlow15 = 0.0;
              let firstFlow15 = undefined;
              let prevFlow15 = 0.0;
              for (let i = observations.length - 1; i >= 0; --i) {
                const o = observations[i];
                if (typeof o.flow15 === 'number' && o.flow15 >= 0.0 && o.flow15 < 100000000.0) {
                  if (firstFlow15 === undefined) {
                    firstFlow15 = o.flow15;
                  }
                  const flow15 = o.flow15 - prevFlow15 - firstFlow15;
                  if (flow15 > maxFlow15) {
                    maxFlow15 = flow15;
                  }
                  prevFlow15 = flow15;
                }
              }

              return {
                flow15: maxFlow15
              };
            }
          }
        }
      },
      layout: [
        { type: "row", entries: [
          { type: "col", size: 6, entries: ["historicalWaterFlow"] }
        ]}
      ]
    };
  }

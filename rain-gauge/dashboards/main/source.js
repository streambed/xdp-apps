function() {
  return {
    panels: {
      historicalRain: {
        title: 'Historical Rain',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'rain-gauge-data-up-json',
          field: 'totalLevel',
          aggregate: function a(topic, observations) {
            function isValid(level) {
              return (typeof level === 'number' && level >= 0.0 && level < 100.0);
            }

            let totalLevel = 0;
            if (observations.length > 0) {
              let firstObs = { level: 0 };
              if (observations.length > 1) {
                firstObs = observations[0];
              }
              const lastObs = observations[observations.length - 1];
              if (isValid(firstObs.level) && isValid(lastObs.level)) {
                totalLevel = lastObs.level - firstObs.level;
              }
            }

            return {
              totalLevel: totalLevel
            };
          }
        }
      }
    },

    layout: [
      {
        type: "row", entries: [
          {
            type: "col", size: 8, entries: [
              {
                type: "row", entries: [
                  { type: "col", size: 8, entries: ["historicalRain"] }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

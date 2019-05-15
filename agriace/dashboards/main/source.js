// it worked



function() {
  return {
    panels: {
      latestWaterHeightBar: {
        title: 'Latest Water Level',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'waterstate-data-up-json',
          field: 'height'
        }
      },

      latestVoltage: {
        title: 'Latest Electric Fence Readings',
        type: 'ObservationCard',
        data: {
          topic: 'electric-fence-data-up-json',
          field: 'voltage'
        }
      },

      historicalWater: {
        title: 'Water Levels',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'waterstate-data-up-json',
          field: 'height'
        }
      },

      historicalVoltage: {
        title: 'Electric Fence Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'electric-fence-data-up-json',
          field: 'voltage'
        }
      },

      stats: {
        title: 'Statistics',
        type: 'NumberCard',
        data: {
          getData: (data) => {
            let observations = 0;

            for (const type of data.getObservationTypes()) {
              observations += data.getObservations(type).length;
            }

            return [
              { name: 'Device Types', value: data.getEndDeviceTypes().length },
              { name: 'Devices', value: data.getEndDevices().length },
              { name: 'Observation Types', value: data.getObservationTypes().length },
              { name: 'Observations', value: observations }
            ];
          }
        }
      }

    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", entries: ["latestWaterHeightBar"]}
          ]},
          { type: "row", entries: [
            { type: "col", size: 6, entries: ["latestVoltage"]},
            { type: "col", size: 6, entries: ["stats"]}
          ]}
        ]},
        { type: "col", size: 6, entries: [
          { type: "row", entries: [
            { type: "col", entries: ["historicalWater"]}
          ]},
          { type: "row", entries: [
            { type: "col", entries: ["historicalVoltage"]}
          ]}
        ]}
      ]}
    ]
  };
}

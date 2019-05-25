# Setting the ICT Weather Probe up in the CISCO FDP Control Panel with sandbox

Adapted from https://streambed.io/sdk-reference/tutorial/configuration.html 

## Starting the Developer Sandbox

Remove existing data for fresh experience.
```
streambed clean
```

Start sandbox using Docker compose.
```
sandbox | docker-compose -p xdp-sandbox -f - up
```

Now open up another terminal and input the following commands.

## Defining device type, devices, and observation types

### Create device type.
```
lora type add weather-station-data-up-mac-payload "ICT Weather Station"
```


### Adding observation types for each sensor reading of the ICT Weather Probe.
Atmospheric Pressure 
```
streambed observation-type add atmospheric-pressure-data-up-json \
  --name 'ICT Weather Station Atmospheric Pressure Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'atmosphericPressure',
    observationsMapGauge: 'atmosphericPressure',
    fields: {
      atmosphericPressure: {
        value: latestObservation.data.atmosphericPressure,
        name: 'AtmosphericPressure',
        text: latestObservation.data.atmosphericPressure + ' bar',
        color: latestObservation.data.atmosphericPressure > 150 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 200
      }
    }
  };
}
EOF
```
X Orientation
```
streambed observation-type add x-orientation-data-up-json \
  --name 'ICT Weather Station X Orientation Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'xOrientation',
    observationsMapGauge: 'xOrientation',
    fields: {
      xOrientation: {
        value: latestObservation.data.xOrientation,
        name: 'XOrientation',
        text: latestObservation.data.xOrientation + ' deg',
        color: latestObservation.data.xOrientation > 0 ? 'danger' : 'success',
        scaleMin: -180,
        scaleMax: 180
      }
    }
  };
}
EOF
```
Y Orientation
```
streambed observation-type add y-orientation-data-up-json \
  --name 'ICT Weather Station Y Orientation Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'yOrientation',
    observationsMapGauge: 'yOrientation',
    fields: {
      yOrientation: {
        value: latestObservation.data.yOrientation,
        name: 'YOrientation',
        text: latestObservation.data.yOrientation + ' deg',
        color: latestObservation.data.yOrientation > 0 ? 'danger' : 'success',
        scaleMin: -180,
        scaleMax: 180
      }
    }
  };
}
EOF
```
Solar:
```
streambed observation-type add solar-data-up-json \
  --name 'ICT Weather Station Solar Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'solar',
    observationsMapGauge: 'solar',
    fields: {
      solar: {
        value: latestObservation.data.solar,
        name: 'solar',
        text: latestObservation.data.solar + ' units',
        color: latestObservation.data.solar > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Precipitation
```
streambed observation-type add precipitation-data-up-json \
  --name 'ICT Weather Station Precipitation Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'precipitation',
    observationsMapGauge: 'precipitation',
    fields: {
      precipitation: {
        value: latestObservation.data.precipitation,
        name: 'precipitation',
        text: latestObservation.data.precipitation + ' mL',
        color: latestObservation.data.precipitation > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 500
      }
    }
  };
}
EOF
```
Strikes
```
streambed observation-type add strikes-data-up-json \
  --name 'ICT Weather Station Strike Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'strikes',
    observationsMapGauge: 'strikes',
    fields: {
      strikes: {
        value: latestObservation.data.strikes,
        name: 'Strikes',
        text: latestObservation.data.strikes + ' units',
        color: latestObservation.data.strikes > 15 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Strike Distance
```
streambed observation-type add strike-distance-data-up-json \
  --name 'ICT Weather Station Strike Distance Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'strikeDistance',
    observationsMapGauge: 'strikeDistance',
    fields: {
      strikeDistance: {
        value: latestObservation.data.strikeDistance,
        name: 'Strike Distance',
        text: latestObservation.data.strikeDistance + ' units',
        color: latestObservation.data.strikeDistance > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Wind Speed
```
streambed observation-type add wind-speed-data-up-json \
  --name 'ICT Weather Station Wind Speed Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'windSpeed',
    observationsMapGauge: 'windSpeed',
    fields: {
      windSpeed: {
        value: latestObservation.data.windSpeed,
        name: 'Wind Speed',
        text: latestObservation.data.windSpeed + ' km/h',
        color: latestObservation.data.windSpeed > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}
EOF
```
Wind Direction
```
streambed observation-type add wind-direction-data-up-json \
  --name 'ICT Weather Station Wind Direction Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'windDirection',
    observationsMapGauge: 'windDirection',
    fields: {
      windDirection: {
        value: latestObservation.data.windDirection,
        name: 'Wind Direction',
        text: latestObservation.data.windDirection + ' degrees',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Gust Speed
```
streambed observation-type add gust-speed-data-up-json \
  --name 'ICT Weather Station Gust Speed Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'gustSpeed',
    observationsMapGauge: 'gustSpeed',
    fields: {
      gustSpeed: {
        value: latestObservation.data.gustSpeed,
        name: 'GustSpeed',
        text: latestObservation.data.gustSpeed + ' km/h',
        color: latestObservation.data.gustSpeed > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Air Temperature
```
streambed observation-type add air-temp-data-up-json \
  --name 'ICT Weather Station Air Temperature Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'airTemp',
    observationsMapGauge: 'airTemp',
    fields: {
      airTemp: {
        value: latestObservation.data.airTemp,
        name: 'AirTemp',
        text: latestObservation.data.airTemp + ' C',
        color: latestObservation.data.airTemp > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Vapour Pressure
```
streambed observation-type add vapour-pressure-data-up-json \
  --name 'ICT Weather Station Vapour Pressure Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'vapourPressure',
    observationsMapGauge: 'vapourPressure',
    fields: {
      vapourPressure: {
        value: latestObservation.data.vapourPressure,
        name: 'VapourPressure',
        text: latestObservation.data.vapourPressure + ' Pa',
        color: latestObservation.data.vapourPressure > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 45
      }
    }
  };
}
EOF
```
Relative Humidity
```
streambed observation-type add relative-humidity-data-up-json \
  --name 'ICT Weather Station Relative Humidity Observations' \
  --secret-path secrets.weather-station.key \
  --view - <<EOF
function(endDevice, latestObservation) {
  return {
    observationsMapValue: 'relativeHumidity',
    observationsMapGauge: 'relativeHumidity',
    fields: {
      relativeHumidity: {
        value: latestObservation.data.relativeHumidity,
        name: 'Relative Humidity',
        text: latestObservation.data.relativeHumidity + '',
        color: latestObservation.data.relativeHumidity > 30 ? 'danger' : 'success',
        scaleMin: 0,
        scaleMax: 100
      }
    }
  };
}
EOF
```

## Add a secret for encrypt transformed observations
```
streambed secret add secrets.weather-station.key 3B7E151628AED2A6ABF7158809CF4F3D
```

## Defining a transformer
Provision a device
```
lora end-device add weather-station-data-up-mac-payload v1 abp \
  --dev-eui 00040921F7088183 \
  --dev-addr F7088183 \
  --app-s-key 5EFF039CF1867EED82E40FE1E82D6B96 \
  --nwk-s-key F82D9D49EA6E88E69DC40A98E6B90D79 \
  --pos "-33.890304,151.1931904" \
  --name "My ICT Weather Sensor"
```

Adding transformer to get observation readings. Note that network key is sample.
```
streambed transformer add \
  --name 'My ICT Weather Station Transformer' \
  --inlet-topic weather-station-data-up-mac-payload \
  --outlet-topic atmospheric-pressure-data-up-json x-orientation-data-up-json y-orientation-data-up-json solar-data-up-json precipitation-data-up-json strikes-data-up-json strike-distance-data-up-json wind-speed-data-up-json wind-direction-data-up-json gust-speed-data-up-json air-temp-data-up-json vapour-pressure-data-up-json relative-humidity-data-up-json \
  --source - <<EOF
function extractFloat(byte_payload, start, end) {
  var bytes = [];
  for(var i = start; i < end; i++) bytes.push(byte_payload[i].charCodeAt(0))
  var bits = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
  var e = bits>>>23 & 0xff;
  var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
  var float = sign * m * Math.pow(2, e - 150);
  return Math.round(float*100)/100;
}  
function transform(time, nwkAddr, fPort, base64_payload) {
  var payload = atob(base64_payload);
  var commandFlag = payload[9].charCodeAt(0);
  if (commandFlag) {
    return [
      {outlet: 0, data: {time: time, nwkAddr: nwkAddr, atmosphericPressure: extractFloat(payload, 10, 14)}},
      {outlet: 1, data: {time: time, nwkAddr: nwkAddr, xOrientation: extractFloat(payload, 14, 18)}},
      {outlet: 2, data: {time: time, nwkAddr: nwkAddr, yOrientation: extractFloat(payload, 18, 22)}}]
  } else {
    return [
      {outlet: 3, data: {time: time, nwkAddr: nwkAddr, solar: extractFloat(payload, 10, 14)}},
      {outlet: 4, data: {time: time, nwkAddr: nwkAddr, precipitation: extractFloat(payload, 14, 18)}},
      {outlet: 5, data: {time: time, nwkAddr: nwkAddr, strikes: extractFloat(payload, 18, 22)}},
      {outlet: 6, data: {time: time, nwkAddr: nwkAddr, strikeDistance: extractFloat(payload, 22, 26)}},
      {outlet: 7, data: {time: time, nwkAddr: nwkAddr, windSpeed: extractFloat(payload, 26, 30)}},
      {outlet: 8, data: {time: time, nwkAddr: nwkAddr, windDirection: extractFloat(payload, 30, 34)}},
      {outlet: 9, data: {time: time, nwkAddr: nwkAddr, gustSpeed: extractFloat(payload, 34, 38)}},
      {outlet: 10, data: {time: time, nwkAddr: nwkAddr, airTemperature: extractFloat(payload, 38, 42)}},
      {outlet: 11, data: {time: time,nwkAddr: nwkAddr, vapourPressure: extractFloat(payload, 42, 46)}},
      {outlet: 12, data: {time: time, nwkAddr: nwkAddr, relativeHumidity: extractFloat(payload, 46, 50)}}]
  }
}
function test() {
  payload = "AAAHMRBqLy8BAULMR65CrzMzwqxmZg==";
  var result = transform("2019-03-29T06:02:04.539Z", 65959, 15, payload);
  return result[0].data.atmosphericPressure === 102.14;
}
EOF
```

## Configure MQTT
```
streambed mqtt add down \
  tutorial-weather-station \
  /tutorial/weather-station/app2dev/data \
  weather-station-data-up-mac-payload \
  --data-is-binary
```

## Adding dashboards
Wind Speed dashboard
```
streambed dashboard add --name 'Wind Speed' --source - <<EOF
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
EOF
```

Strikes dashboard
```
streambed dashboard add --name 'Strikes' --source - <<EOF
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
EOF
```

Air Condition dashboard
```
streambed dashboard add --name 'Air Condition' --source - <<EOF
function() {
  return {
    panels: {
      latestAirTemperature: {
        title: 'Latest Air Temperature',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'air-temp-data-up-json',
          field: 'airTemperature'
        }
      },
      historicalAirTemperature: {
        title: 'Historical Air Temperature',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'air-temp-data-up-json',
          field: 'airTemperature'
        }
      },
      latestVapourPressure: {
        title: 'Latest Vapour Pressure',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'vapour-pressure-data-up-json',
          field: 'vapourPressure'
        }
      },
      historicalVapourPressure: {
        title: 'Latest Vapour Pressure',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'vapour-pressure-data-up-json',
          field: 'vapourPressure'
        }
      },
      latestRelativeHumidity: {
        title: 'Latest Relative Humidity',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'relative-humidity-data-up-json',
          field: 'relativeHumidity'
        }
      },
      historicalRelativeHumidity: {
        title: 'Latest Relative Humidity',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'relative-humidity-data-up-json',
          field: 'relativeHumidity'
        }
      },
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestAirTemperature"]},
        { type: "col", size: 8, entries: ["historicalAirTemperature"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestVapourPressure"]},
        { type: "col", size: 8, entries: ["historicalVapourPressure"]},
      ]},
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestRelativeHumidity"]},
        { type: "col", size: 8, entries: ["historicalRelativeHumidity"]},
      ]}
    ]
  };
}
EOF
```

Atmospheric Pressure dashboard
```
streambed dashboard add --name 'Atmospheric Pressure' --source - <<EOF
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
EOF
```

Precipitation
```
streambed dashboard add --name 'Precipitation' --source - <<EOF
function() {
  return {
    panels: {
      latestPrecipitation: {
        title: 'Latest Precipitation',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'precipitation-data-up-json',
          field: 'precipitation'
        }
      },
      
      historicalPrecipitation: {
        title: 'Precipitation Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'precipitation-data-up-json',
          field: 'precipitation'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestPrecipitation"] },
        { type: "col", size: 8, entries: ["historicalPrecipitation"] }
        
      ]}
    ]
  };
}
EOF
```

Solar
```
streambed dashboard add --name 'Solar' --source - <<EOF
function() {
  return {
    panels: {
      latestSolar: {
        title: 'Latest Solar',
        type: 'ObservationBarChartCard',
        data: {
          topic: 'solar-data-up-json',
          field: 'solar'
        }
      },
      
      historicalSolar: {
        title: 'Solar Readings',
        type: 'ObservationTimeSeriesCard',
        data: {
          topic: 'solar-data-up-json',
          field: 'solar'
        }
      }
    },

    layout: [
      { type: "row", entries: [
        { type: "col", size: 4, entries: ["latestSolar"] },
        { type: "col", size: 8, entries: ["historicalSolar"] }
        
      ]}
    ]
  };
}
EOF
```
## Viewing the Dashboard

Control centre should be fully configured, now open up the web app user interface.

https://localhost:9870/
username: admin
password: password

Generate payload for mode _command = 1_
```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 5EFF039CF1867EED82E40FE1E82D6B96  F7088183 00000731106A2F2F010142CC47AE42AF3333C2AC6666
```
Publish the Base64 payload
```
mosquitto_pub -h localhost -p 1883 -t /tutorial/air-temp/app2dev/data -l \
  <<< '{"key":29591785,"data":"QIOBCPcAAgABpTedydljud5IZ1Z5+FqPZ9FN3lwNGisR/w0="}'
```

Generate payload for mode _command = 0_
```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 5EFF039CF1867EED82E40FE1E82D6B96  F7088183 00000731106A2F2F010042CC47AE42AF3333C2AC666642CC47AE42AF3333C2AC666642CC47AE42AF3333C2AC666642CC47AE
```
Publish the Base64 payload
```
mosquitto_pub -h localhost -p 1883 -t /tutorial/air-temp/app2dev/data -l \
  <<< '{"key":29591785,"data":"40838108f700020001a5379dc9d963b9de48665679f85a8f67d14dde5c0d1af7da5fffe65b4f898d67475c7ad86252714ee820d0c5e22e8a9849a12b11ff0d"}'
```

Ctrl^C on xDP hosting terminal to stop xDP.

To remove docker setup, type the following:
```
sandbox | docker-compose -p xdp-sandbox -f - down
```


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
  --name 'Atmospheric Pressure' \
  --secret-path secrets.atmospheric-pressure.key \
  --view - < ../atmospheric-pressure/observation-types/atmospheric-pressure/view.js
```

X Orientation
```
streambed observation-type add x-orientation-data-up-json \
  --name 'X Orientation' \
  --secret-path secrets.x-orientation.key \
  --view - < ../atmospheric-pressure/observation-types/x-orientation/view.js
```

Y Orientation
```
streambed observation-type add y-orientation-data-up-json \
  --name 'Y Orientation' \
  --secret-path secrets.y-orientation.key \
  --view - < ../atmospheric-pressure/observation-types/y-orientation/view.js
```

Solar:
```
streambed observation-type add solar-data-up-json \
  --name 'Solar' \
  --secret-path secrets.solar.key \
  --view - < ../solar/observation-types/solar/view.js
```

Precipitation
```
streambed observation-type add rain-gauge-data-up-json \
  --name 'Rain Gauge' \
  --secret-path secrets.rain-gauge.key \
  --view - < ../rain-gauge/observation-types/main/view.js
```

Strikes
```
streambed observation-type add strikes-data-up-json \
  --name 'Strike' \
  --secret-path secrets.strikes.key \
  --view - < ../strikes/observation-types/strikes/view.js
```

Strike Distance
```
streambed observation-type add strike-distance-data-up-json \
  --name 'Strike Distance' \
  --secret-path secrets.strike-distance.key \
  --view - < ../strikes/observation-types/strike-distance/view.js
```

Wind Speed
```
streambed observation-type add wind-speed-data-up-json \
  --name 'Wind Speed' \
  --secret-path secrets.wind-speed.key \
  --view - < ../wind-speed/observation-types/wind-speed/view.js
```

Wind Direction
```
streambed observation-type add wind-direction-data-up-json \
  --name 'Wind Direction' \
  --secret-path secrets.wind-direction.key \
  --view - < ../wind-speed/observation-types/wind-direction/view.js

```

Gust Speed
```
streambed observation-type add gust-speed-data-up-json \
  --name 'Gust Speed' \
  --secret-path secrets.gust-speed.key \
  --view - < ../wind-speed/observation-types/gust-speed/view.js
```

Air Temperature
```
streambed observation-type add air-temp-data-up-json \
  --name 'Air Temperature' \
  --secret-path secrets.air-temp.key \
  --view - < ../air-condition/observation-types/air-temp/view.js
```
Vapour Pressure
```
streambed observation-type add vapour-pressure-data-up-json \
  --name 'Vapour Pressure' \
  --secret-path secrets.vapour-pressure.key \
  --view - < ../air-condition/observation-types/vapour-pressure/view.js
```
Relative Humidity
```
streambed observation-type add relative-humidity-data-up-json \
  --name 'Relative Humidity' \
  --secret-path secrets.relative-humidity.key \
  --view - < ../air-condition/observation-types/relative-humidityg/view.js
```

## Add secrets for encrypt transformed observations
```
streambed secret add secrets.atmospheric-pressure.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.x-orientation.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.y-orientation.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.solar.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.rain-gauge.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.strikes.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.strike-distance.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.wind-speed.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.wind-direction.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.gust-speed.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.air-temp.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.vapour-pressure.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.relative-humidity.key 3B7E151628AED2A6ABF7158809CF4F3D

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
  --name "ICT Weather Sensor"
```

Adding transformer to get observation readings. Note that network key is sample.
```
streambed transformer add \
  --name 'ICT Weather Station Transformer' \
  --inlet-topic weather-station-data-up-mac-payload \
  --outlet-topic atmospheric-pressure-data-up-json x-orientation-data-up-json y-orientation-data-up-json solar-data-up-json rain-gauge-data-up-json strikes-data-up-json strike-distance-data-up-json wind-speed-data-up-json wind-direction-data-up-json gust-speed-data-up-json air-temp-data-up-json vapour-pressure-data-up-json relative-humidity-data-up-json \
  --source - < ./transformers/main/source.js
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
Wind Speed Dashboard
```
streambed dashboard add --name 'Wind Speed' --source - < ../wind-speed/dashboards/main/source.js
```

Strikes Dashboard
```
streambed dashboard add --name 'Strikes' --source - < ../strikes/dashboards/main/source.js
```

Air Condition Dashboard
```
streambed dashboard add --name 'Air Condition' --source - < ../air-condition/dashboards/main/source.js
```

Atmospheric Pressure Dashboard
```
streambed dashboard add --name 'Atmospheric Pressure' --source - < ../atmospheric-pressure/dashboards/main/source.js
```

Precipitation Dashboard
```
streambed dashboard add --name 'Rain Gauges' --source - < ../rain-gauge/dashboards/main/source.js
```

Solar Dashboard
```
streambed dashboard add --name 'Solar' --source - < ../solar/dashboards/main/source.js
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
mosquitto_pub -h localhost -p 1883 -t /tutorial/weather-station/app2dev/data -l \
  <<< '{"key":17334659,"data":"QIOBCPcAAgABpTedydljud5IZ1Z5+FqPZ9FN3lwNGisR/w0="}'
```

Generate payload for mode _command = 0_
```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 5EFF039CF1867EED82E40FE1E82D6B96  F7088183 00000731106A2F2F010042CC47AE42AF3333C2AC666642CC47AE42AF3333C2AC666642CC47AE42AF3333C2AC666642CC47AE
```
Publish the Base64 payload
```
mosquitto_pub -h localhost -p 1883 -t /tutorial/weather-station/app2dev/data -l \
  <<< '{"key":17334659,"data":"QIOBCPcAAgABpTedydljud5IZlZ5+FqPZ9FN3lwNGvfaX//mW0+JjWdHXHrYYlJxTugg0MXiLoqYSaErEf8N"}'
```

Ctrl^C on xDP hosting terminal to stop xDP.

To remove docker setup, type the following:
```
sandbox | docker-compose -p xdp-sandbox -f - down
```

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
  --view - < ./observation-types/atmospheric-pressure-data-up-json/main/view.js
```

X Orientation
```
streambed observation-type add x-orientation-data-up-json \
  --name 'ICT Weather Station X Orientation Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/x-orientation-data-up-json/main/view.js
```

Y Orientation
```
streambed observation-type add y-orientation-data-up-json \
  --name 'ICT Weather Station Y Orientation Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/y-orientation-data-up-json/main/view.js
```

Solar:
```
streambed observation-type add solar-data-up-json \
  --name 'ICT Weather Station Solar Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/solar-data-up-json/main/view.js
```

Precipitation
```
streambed observation-type add precipitation-data-up-json \
  --name 'ICT Weather Station Precipitation Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/precipitation-data-up-json/main/view.js
```

Strikes
```
streambed observation-type add strikes-data-up-json \
  --name 'ICT Weather Station Strike Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/strikes-data-up-json/main/view.js
```

Strike Distance
```
streambed observation-type add strike-distance-data-up-json \
  --name 'ICT Weather Station Strike Distance Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/strike-distance-data-up-json/main/view.js
```

Wind Speed
```
streambed observation-type add wind-speed-data-up-json \
  --name 'ICT Weather Station Wind Speed Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/wind-speed-data-up-json/main/view.js
```

Wind Direction
```
streambed observation-type add wind-direction-data-up-json \
  --name 'ICT Weather Station Wind Direction Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/wind-direction-data-up-json/main/view.js

```

Gust Speed
```
streambed observation-type add gust-speed-data-up-json \
  --name 'ICT Weather Station Gust Speed Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/gust-speed-data-up-json/main/view.js
```

Air Temperature
```
streambed observation-type add air-temp-data-up-json \
  --name 'ICT Weather Station Air Temperature Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/air-temp-data-up-json/main/view.js
```
Vapour Pressure
```
streambed observation-type add vapour-pressure-data-up-json \
  --name 'ICT Weather Station Vapour Pressure Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/vapour-pressure-data-up-json/main/view.js
```
Relative Humidity
```
streambed observation-type add relative-humidity-data-up-json \
  --name 'ICT Weather Station Relative Humidity Observations' \
  --secret-path secrets.weather-station.key \
  --view - < ./observation-types/relative-humidity-data-up-json/main/view.js
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
streambed dashboard add --name 'Wind Speed' --source - < ./dashboards/wind-speed/main/source.js
```

Strikes Dashboard
```
streambed dashboard add --name 'Strikes' --source - < ./dashboards/strikes/main/source.js
```

Air Condition Dashboard
```
streambed dashboard add --name 'Air Condition' --source - < ./dashboards/air-condition/main/source.js
```

Atmospheric Pressure Dashboard
```
streambed dashboard add --name 'Atmospheric Pressure' --source - < ./dashboards/atmospheric-pressure/main/source.js
```

Precipitation Dashboard
```
streambed dashboard add --name 'Precipitation' --source - < ./dashboards/precipitation/main/source.js
```

Solar Dashboard
```
streambed dashboard add --name 'Solar' --source - < ./dashboards/solar/main/source.js
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

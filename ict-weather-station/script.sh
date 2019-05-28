#!/bin/bash

# This script will execute all the code in the README.md file.
echo "Starting execution script..."

# Log in:
streambed login admin

# Add weather sensor.
lora type add weather-station-data-up-mac-payload "ICT Weather Station"

# Add observation types.
streambed observation-type add atmospheric-pressure-data-up-json \
  --name 'Atmospheric Pressure' \
  --secret-path secrets.atmospheric-pressure.key \
  --view - < ./observation-types/atmospheric-pressure-data-up-json/main/view.js

streambed observation-type add x-orientation-data-up-json \
  --name 'X Orientation' \
  --secret-path secrets.x-orientation.key \
  --view - < ./observation-types/x-orientation-data-up-json/main/view.js

streambed observation-type add y-orientation-data-up-json \
  --name 'Y Orientation' \
  --secret-path secrets.y-orientation.key \
  --view - < ./observation-types/y-orientation-data-up-json/main/view.js

streambed observation-type add solar-data-up-json \
  --name 'Solar' \
  --secret-path secrets.solar.key \
  --view - < ./observation-types/solar-data-up-json/main/view.js

streambed observation-type add rain-gauge-data-up-json \
  --name 'Rain Gauge' \
  --secret-path secrets.rain-gauge.key \
  --view - < ../rain-gauge/observation-types/main/view.js

streambed observation-type add strikes-data-up-json \
  --name 'Strike' \
  --secret-path secrets.strikes.key \
  --view - < ./observation-types/strikes-data-up-json/main/view.js

streambed observation-type add strike-distance-data-up-json \
  --name 'Strike Distance' \
  --secret-path secrets.strike-distance.key \
  --view - < ./observation-types/strike-distance-data-up-json/main/view.js

streambed observation-type add wind-speed-data-up-json \
  --name 'Wind Speed' \
  --secret-path secrets.wind-speed.key \
  --view - < ./observation-types/wind-speed-data-up-json/main/view.js

streambed observation-type add wind-direction-data-up-json \
  --name 'Wind Direction' \
  --secret-path secrets.wind-direction.key \
  --view - < ./observation-types/wind-direction-data-up-json/main/view.js

streambed observation-type add gust-speed-data-up-json \
  --name 'Gust Speed' \
  --secret-path secrets.gust-speed.key \
  --view - < ./observation-types/gust-speed-data-up-json/main/view.js

streambed observation-type add air-temp-data-up-json \
  --name 'Air Temperature' \
  --secret-path secrets.air-temp.key \
  --view - < ./observation-types/air-temp-data-up-json/main/view.js

streambed observation-type add vapour-pressure-data-up-json \
  --name 'Vapour Pressure' \
  --secret-path secrets.vapour-pressure.key \
  --view - < ./observation-types/vapour-pressure-data-up-json/main/view.js

streambed observation-type add relative-humidity-data-up-json \
  --name 'Relative Humidity' \
  --secret-path secrets.relative-humidity.key \
  --view - < ./observation-types/relative-humidity-data-up-json/main/view.js

# Add secrets.
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

# Add end device.
lora end-device add weather-station-data-up-mac-payload v1 abp \
  --dev-eui 00040921F7088183 \
  --dev-addr F7088183 \
  --app-s-key 5EFF039CF1867EED82E40FE1E82D6B96 \
  --nwk-s-key F82D9D49EA6E88E69DC40A98E6B90D79 \
  --pos "-33.890304,151.1931904" \
  --name "ICT Weather Sensor"

# Add transformer.
streambed transformer add \
  --name 'ICT Weather Station Transformer' \
  --inlet-topic weather-station-data-up-mac-payload \
  --outlet-topic atmospheric-pressure-data-up-json x-orientation-data-up-json y-orientation-data-up-json solar-data-up-json rain-gauge-data-up-json strikes-data-up-json strike-distance-data-up-json wind-speed-data-up-json wind-direction-data-up-json gust-speed-data-up-json air-temp-data-up-json vapour-pressure-data-up-json relative-humidity-data-up-json \
  --source - < ./transformers/main/source.js

# Add MQTT.
streambed mqtt add down \
  tutorial-weather-station \
  /tutorial/weather-station/app2dev/data \
  weather-station-data-up-mac-payload \
  --data-is-binary

# Add dashboards.
streambed dashboard add --name 'Wind Speed' --source - < ./dashboards/wind-speed/main/source.js
streambed dashboard add --name 'Strikes' --source - < ./dashboards/strikes/main/source.js
streambed dashboard add --name 'Air Condition' --source - < ./dashboards/air-condition/main/source.js
streambed dashboard add --name 'Atmospheric Pressure' --source - < ./dashboards/atmospheric-pressure/main/source.js
streambed dashboard add --name 'Rain Gauges' --source - < ../rain-gauge/dashboards/main/source.js
streambed dashboard add --name 'Solar' --source - < ./dashboards/solar/main/source.js

# Finish here.
echo "Script execution complete..."

#!/bin/bash

# This script will execute all the code in the README.md file.
echo "Starting execution script..."

# Log in:
streambed login admin

# Add weather sensor.
lora type add weather-station-data-up-mac-payload "ICT Weather Station"

# Add observation types.
streambed observation-type add barometric-pressure-data-up-json \
  --name 'Barometric Pressure' \
  --secret-path secrets.barometric-pressure.key \
  --view - < ../barometric-pressure/observation-types/barometric-pressure/view.js

streambed observation-type add x-orientation-data-up-json \
  --name 'Compass Heading' \
  --secret-path secrets.x-orientation.key \
  --view - < ../barometric-pressure/observation-types/x-orientation/view.js

streambed observation-type add y-orientation-data-up-json \
  --name 'Tilt' \
  --secret-path secrets.y-orientation.key \
  --view - < ../barometric-pressure/observation-types/y-orientation/view.js

streambed observation-type add solar-radiation-data-up-json \
  --name 'Solar Radiation' \
  --secret-path secrets.solar-radiation.key \
  --view - < ../solar-radiation/observation-types/solar-radiation/view.js

streambed observation-type add rain-gauge-data-up-json \
  --name 'Rain Gauge' \
  --secret-path secrets.rain-gauge.key \
  --view - < ../rain-gauge/observation-types/main/view.js

streambed observation-type add lightning-strikes-data-up-json \
  --name 'Lightning Strikes' \
  --secret-path secrets.lightning-strikes.key \
  --view - < ../lightning-strikes/observation-types/lightning-strikes/view.js

streambed observation-type add lightning-strike-distance-data-up-json \
  --name 'Lightning Strike Distance' \
  --secret-path secrets.lightning-strike-distance.key \
  --view - < ../lightning-strikes/observation-types/lightning-strike-distance/view.js

streambed observation-type add wind-speed-data-up-json \
  --name 'Wind Speed' \
  --secret-path secrets.wind-speed.key \
  --view - < ../wind-speed/observation-types/wind-speed/view.js

streambed observation-type add wind-direction-data-up-json \
  --name 'Wind Direction' \
  --secret-path secrets.wind-direction.key \
  --view - < ../wind-speed/observation-types/wind-direction/view.js

streambed observation-type add gust-speed-data-up-json \
  --name 'Gust Speed' \
  --secret-path secrets.gust-speed.key \
  --view - < ../wind-speed/observation-types/gust-speed/view.js

streambed observation-type add air-temp-data-up-json \
  --name 'Air Temperature' \
  --secret-path secrets.air-temp.key \
  --view - < ../air-conditions/observation-types/air-temp/view.js

streambed observation-type add vapour-pressure-data-up-json \
  --name 'Vapour Pressure' \
  --secret-path secrets.vapour-pressure.key \
  --view - < ../air-conditions/observation-types/vapour-pressure/view.js

streambed observation-type add relative-humidity-data-up-json \
  --name 'Relative Humidity' \
  --secret-path secrets.relative-humidity.key \
  --view - < ../air-conditions/observation-types/relative-humidity/view.js

# Add secrets.
streambed secret add secrets.atmospheric-pressure.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.x-orientation.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.y-orientation.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.solar-radiation.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.rain-gauge.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.lightning-strikes.key 3B7E151628AED2A6ABF7158809CF4F3D
streambed secret add secrets.lightning-strike-distance.key 3B7E151628AED2A6ABF7158809CF4F3D
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
  --outlet-topic atmospheric-pressure-data-up-json x-orientation-data-up-json y-orientation-data-up-json solar-radiation-data-up-json rain-gauge-data-up-json lightning-strikes-data-up-json lightning-strike-distance-data-up-json wind-speed-data-up-json wind-direction-data-up-json gust-speed-data-up-json air-temp-data-up-json vapour-pressure-data-up-json relative-humidity-data-up-json \
  --source - < ./transformers/main/source.js

# Add MQTT.
streambed mqtt add down \
  tutorial-weather-station \
  /tutorial/weather-station/app2dev/data \
  weather-station-data-up-mac-payload \
  --data-is-binary

# Add dashboards.
streambed dashboard add --name 'Wind Speed' --source - < ../wind-speed/dashboards/main/source.js
streambed dashboard add --name 'Lightning Strikes' --source - < ../lightning-strikes/dashboards/main/source.js
streambed dashboard add --name 'Air Conditions' --source - < ../air-conditions/dashboards/main/source.js
streambed dashboard add --name 'Barometric Pressure' --source - < ../barometric-pressure/dashboards/main/source.js
streambed dashboard add --name 'Rain Gauges' --source - < ../rain-gauge/dashboards/main/source.js
streambed dashboard add --name 'Solar Radiation' --source - < ../solar-radiation/dashboards/main/source.js

# Finish here.
echo "Script execution complete..."

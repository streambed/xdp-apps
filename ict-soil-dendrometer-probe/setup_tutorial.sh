#!/bin/bash

echo "Starting script to set up ICT Soil Moisture Dendrometer Probe with Streambed"

lora type add soil-dendrometer-data-up-mac-payload "ICT Soil Moisture and Dendrometer Station"

streambed observation-type add soil-vwc-count-data-up-json \
  --name 'Soil VWC Count' \
  --secret-path secrets.soil-dendrometer-vwc-count.key \
  --view - < ../soil-moisture/observation-types/soil-vwc-count/view.js

streambed observation-type add soil-temperature-data-up-json \
  --name 'Soil Temperature' \
  --secret-path secrets.soil-dendrometer-temperature.key \
  --view - < ../soil-moisture/observation-types/soil-temperature/view.js

streambed observation-type add soil-ec-data-up-json \
  --name 'Soil Electrical Conductivity' \
  --secret-path secrets.soil-dendrometer-ec.key \
  --view - < ../soil-moisture/observation-types/soil-ec/view.js

streambed observation-type add soil-vwc-data-up-json \
  --name 'Soil VWC' \
  --secret-path secrets.soil-dendrometer-vwc.key \
  --view - < ../soil-moisture/observation-types/soil-vwc/view.js

streambed observation-type add stem-diameter-data-up-json \
  --name 'Stem Diameter' \
  --secret-path secrets.soil-dendrometer-stem-diameter.key \
  --view - < ../dendrometer/observation-types/stem-diameter/view.js

streambed observation-type add stem-temperature-data-up-json \
  --name 'Stem Temperature' \
  --secret-path secrets.soil-dendrometer-stem-temperature.key \
  --view - < ../dendrometer/observation-types/stem-temperature/view.js

streambed secret add secrets.soil-dendrometer-vwc-count.key 3B7E151628AED2A6ABF7158809CF4F3A
streambed secret add secrets.soil-dendrometer-temperature.key 3B7E151628AED2A6ABF7158809CF4F3A
streambed secret add secrets.soil-dendrometer-ec.key 3B7E151628AED2A6ABF7158809CF4F3A
streambed secret add secrets.soil-dendrometer-vwc.key 3B7E151628AED2A6ABF7158809CF4F3A
streambed secret add secrets.soil-dendrometer-stem-diameter.key 3B7E151628AED2A6ABF7158809CF4F3A
streambed secret add secrets.soil-dendrometer-stem-temperature.key 3B7E151628AED2A6ABF7158809CF4F3A

lora end-device add soil-dendrometer-data-up-mac-payload v1 abp \
  --dev-eui 0081C343189D832A \
  --dev-addr 189D832A \
  --app-s-key 6D5E58EF92BBCE878894497271BA90ED \
  --nwk-s-key F82D9DA9EA6E88EA9DC40A98E6B90DAA \
  --pos "-33.890304,151.1931904" \
  --name "My ICT Soil Moisture Dendrometer Sensor"

streambed transformer add \
  --name 'My ICT Soil Moisture Dendrometer Transformer' \
  --inlet-topic soil-dendrometer-data-up-mac-payload \
  --outlet-topic stem-diameter-data-up-json stem-temperature-data-up-json soil-vwc-count-data-up-json soil-temperature-data-up-json soil-ec-data-up-json soil-vwc-data-up-json \
  --source - < ./transformers/main/source.js

streambed mqtt add down \
  tutorial-soil-dendrometer \
  /tutorial/soil-dendrometer/app2dev/data \
  soil-dendrometer-data-up-mac-payload \
  --data-is-binary

streambed dashboard add --name 'Soil Moisture' --source - < ../soil-moisture/dashboards/main/source.js
streambed dashboard add --name 'Dendrometer' --source - < ../dendrometer/dashboards/main/source.js

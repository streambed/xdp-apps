The following commands were used to develop the `ict-water-flow` locally:

```
lora type add p-node-data-up-mac-payload "ICT P-Node"

streambed observation-type add water-flow-data-up-json \
  --name 'My Water Flow Observations' \
  --secret-path secrets.water-flow.key \
  --view - < ../water-flow/observation-types/main/view.js

streambed secret add secrets.water-flow.key 3B7E151628AED2A6ABF7158809CF4F3D

lora end-device add p-node-data-up-mac-payload v1 abp \
  --dev-eui B4B05FF9F3C388E9 \
  --dev-addr F3C388E9 \
  --app-s-key 8F74FD863E5F7854D58D7CACC15804CA \
  --nwk-s-key F82D9D49EA6E88E69DC40A98E6B90D79 \
  --pos "-37.15,146.19" \
  --name "My Water Flow Sensor #1"

streambed transformer add \
  --name 'My Water Flow Transformer' \
  --inlet-topic p-node-data-up-mac-payload \
  --outlet-topic water-flow-data-up-json \
  --source - < transformers/main/source.js

streambed mqtt add down \
  tutorial-water-flow \
  /tutorial/water-flow/app2dev/data \
  p-node-data-up-mac-payload \
  --data-is-binary

streambed mqtt add up \
  water-flow-up \
  --secret-path=secrets.water-flow.key \
  water-flow-data-up-json \
  mqtt-waterflow-down

streambed dashboard add --name 'Water Flow' --source - < ../water-flow/dashboards/main/source.j
```

You can then use the following to determine a Base64 encoding and use `mosquitto_pub` to publish data as if it arrived via LoRaWAN:

```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 8F74FD863E5F7854D58D7CACC15804CA  F3C388E9 0000007B0D600000001E0000000F0000001300000019

mosquitto_pub -h localhost -p 1883 -t /tutorial/water-flow/app2dev/data -l \
  <<< '{"key":29591785,"data":"QOmIw/MAAgABxmPntCGdgwggSjodr7sQnURz//vUSSsR/w0="}'
```
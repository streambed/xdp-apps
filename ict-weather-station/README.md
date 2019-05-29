# Setting the ICT Soil Mosture Dendrometer Sensor up in the CISCO FDP Control Panel with sandbox

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

## Setting up device, observation types, transformers and dashboards

Now open up another terminal and run the following script:
```
./setup_tutorial.sh
```
Note, it may be necessary to modify permissions of the script first:
```
chmod +x setup_tutorial.sh
```
When prompted for authentication:
```
username: admin
password: password
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

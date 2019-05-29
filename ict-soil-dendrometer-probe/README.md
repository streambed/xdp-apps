# Setting the ICT Soil Moisture Dendrometer Sensor up in the CISCO FDP Control Panel with sandbox

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

Generate soil moisture payload for mode _command = 1_
```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 6D5E58EF92BBCE878894497271BA90ED  189D832A 00000731106A2F2F0101455F400042AF333342AF3333
```
Publish the Base64 payload
```
mosquitto_pub -h localhost -p 1883 -t /tutorial/soil-dendrometer/app2dev/data -l \
  <<< '{"key":10322730,"data":"QCqDnRgAAgABq6/vOZkU+K/nrG2GbDkEeom56vXUsSsR/w0="}'
```

Generate dendrometer payload for mode _command = 0_
```
docker run --rm -ti streambed-cli/amd64/lora-packet-encoder:latest 6D5E58EF92BBCE878894497271BA90ED  189D832A 00000731106A2F2F010042CC47AE42AF3333
```
Publish the Base64 payload
```
mosquitto_pub -h localhost -p 1883 -t /tutorial/soil-dendrometer/app2dev/data -l \
  <<< '{"key":10322730,"data":"QCqDnRgAAgABq6/vOZkU+K/nrWoVa5cEeom5KxH/DQ=="}'
```

Ctrl^C on xDP hosting terminal to stop xDP.

To remove docker setup, type the following:
```
sandbox | docker-compose -p xdp-sandbox -f - down
```

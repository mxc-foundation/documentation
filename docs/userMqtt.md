---
id: mqtt
title: MQTT
sidebar_label: MQTT
---

## Subscription 
Users can subscribe to MQTT broker under topics in the servers after authentication. Before that, you need to make sure you have mosquitto package installed. Use the package manager apt to install these dependencies on the Ubuntu 18.04 LTS server:

```
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt install mosquitto mosquitto-clients
```
You can either subscribe to the broker in your console or you can use package for Subscription inside your program. User will given the access to all the topics under the application domain if the user is active and is application admin. 

An example of subscribing to the topic will be:

```
# Admin have full access to all the application topics
# thus here we can access all the messages from all the nodes
mosquitto_sub -h SUPERNODE_URL -p 8883 -t "#" -v  -u "admin_username" -P "admin_password" -i "`hostname`-$$" --capath /etc/ssl/certs

# Application Admin have access to the topics under application 201
# thus here we can only access to all the nodes in application 201
mosquitto_sub -h SUPERNODE_URL -p 8883 -t "application/201/#" -v -u "app_username" -P "app_password" -i "`hostname`-$$" --capath /etc/ssl/certs
```

Don't forget to replace SUPERNODE_URL with the URL of the supernode you are attempting to connect with.

If you wish to connect to MQTT, contact us at support@mxc.org to get your unique MQTT username and password.

## Uplink Payload Data Format

After you sucessfully subscribe to the MQTT broker, then you would possibly see something in your console as follow:

```
# data field in json is your payload
{"applicationID":"201","applicationName":"APP_NAME","nodeName":"stick-0005","devEUI":"001122fffe334455","rxInfo":[{"mac":"667788fffe99aabb","rssi":-108,"loRaSNR":-9.8,"name":"Gateway 667788fffe99aabb","latitude":52.5201761,"longitude":13.4036008,"altitude":0}],"txInfo":{"frequency":867500000,"dataRate":{"modulation":"LORA","bandwidth":125,"spreadFactor":11},"adr":true,"codeRate":"4/5"},"fCnt":11,"fPort":1,"data":"IdccAQH81OABb7V6AIEC"}
``` 

Then you can try to parse the data use the following specifications:

```
echo IdccAQH81OABb7V6AIEC | base64 --decode | hexdump -C
00000000  21 d7 1c 01 01 fc d4 e0  01 6f b5 7a 00 81 02     |!........o.z...|
0000000f
```

The payload is consisting of several commands in a Type-Length-Value (TLV) format. The first byte is consisting of Type (bits [7:4]), defining the command, and Length (bits [3:0]), the length of the arguments in bytes. If the Length bits are 0xF (binary 1111), the command has its length specified in bits [5:0] of the second byte.

| Number | Name          | Length | Description                                                                                       |
|--------|---------------|--------|---------------------------------------------------------------------------------------------------|
| 0      | Param value   | >=2    | Response to the "Get params" command. The first byte is the param number, the rest are the value. |
| 1      | Sensor data   | >=1    | Sensor data.                                                                                      |
| 2      | Battery level | 1      | Battery level in 10mV steps from 2V (0 = 2V, 255 = 4.55V).                                        |

Sensor data consists of a byte signifying the sensor type, as defined in sensor.c, and zero or more bytes of sensor data. The defined types and corresponding data formats are:

| Number | Name    | Length | Description      |
|--------|---------|--------|------------------|
| 0      | Unknown | 0      | No data.         |
| 1      | GPS     | 11     | GPS coordinates. |
| 2      | Temp    | 1      | Temperature.     |

<b>GPS data format is as follows:</b>

[When data length is 1]

| Offset | Length | Description                                                                                                                                                                                                      |
|--------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | 1      | Indicates whether the node has moved since last GPS fix.  Possible values are:<br>&nbsp;&nbsp;&nbsp;&nbsp;0: Node is stable since last GPS fix<br>&nbsp;&nbsp;&nbsp;&nbsp;1: Node has moved, or has not received a GPS fix since boot; waiting for GPS fix |


[When data length is 11]

| Offset | Length | Description                                                                                                                                                                                    |
|--------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | 1      | $GPGGA Position Fix Indicator.  Possible values are: <br>* 0 Fix not available or invalid<br> * 1 GPS SPS Mode, fix valid<br> * 2 Differential GPS, SPS Mode, fix valid <br>* 6 Dead Reckoning Mode, fix valid |
| 1      | 4      | Lattitude in 1/1000 of minutes, as little-endian int32. Positive is north, negative is south. To get the value in degrees, divide by 600000.                                                   |
| 5      | 4      | Longitude in 1/1000 of minutes, as little-endian int32. Positive is east, negative is west. To get the value in degrees, divide by 600000.                                                     |
| 9      | 2      | Altitude above geoid mean sea level in decimetres (0.1m), as little-endian int16.                                                                                                              |

<b>Temperature data format is as follows:</b>

| Offset | Length | Description                                                                                                                                   |
|--------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | 1      | Temperature in degrees Celsius as a signed int8_t, giving the range between -128 and +127. Temperatures outside this range are not sent.      |
| 1      | 1      | If present, fractional temperature in 1/256th degrees Celsius as a unsigned uint8_t. Typically only the most significant 3 bits hold a value. |


## Publishing
To send messages to the nodes, publish to MQTT topic:

```
# To send a message to a node, issue the following command:
mosquitto_pub -h SUPERNODE_URL -p 8883  -u "ADMIN_USERNAME" -P "ADMIN_PASSWORD" -t "application/201/device/NODE_DEVEUI/tx" -m '{"confirmed":true,"fPort":1,"data":"DATA_IN_BASE64"}' --capath /etc/ssl/certs
```

## Downlink Payload Data Format

Payload is consisting of several commands in a Type-Length-Value (TLV) format. The first byte is consisting of Type (bits [7:4]), defining the command, and Length (bits [3:0]), the length of the arguments in bytes. If the Length bits are 0xF (binary 1111), the command has its length specified in bits [5:0] of the second byte.

| Number | Name           | Length | Description                                                                                                                                                                                                                                                                  |
|--------|----------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | Get params     | 1      | Get parameter described by first byte.                                                                                                                                                                                                                                       |
| 1      | Set params     | >=2    | Set parameter described by first byte to the value specified in the rest of the message.                                                                                                                                                                                     |
| 2      | Reboot         | 0      | Reboot the node immediately.                                                                                                                                                                                                                                                 |
| 1      | Reboot/upgrade | 1      | Reboot the node after the specified timeout; optionally turn BLE and SUOTA on for upgrades. The argument is as follows:bit [7]:0: just reboot1: BLE onbits [6:3]: Reservedbits [2:0]: Timeout0: TBD1: 5 minutes2: 15 minutes3: 30 minutes4: 1 hour5: 2 hours6: 4 hours7: TBD |

Parameters are as follows:

| Number | Name   | Length | Description                                     |
|--------|--------|--------|-------------------------------------------------|
| 0      | deveui | 6      | DevEUI-48 and BLE MAC address (MSBF)            |
| 1      | appeui | 8      | AppEUI-64 (MSBF)                                |
| 2      | appkey | 16     | AppKey (write-only)                             |
| 3      | period | 1      | Sensor period                                   |
| 4      | sf     | 1      | Minimal LoRa Spread Factor (valid values: 7-12) |

Parameters 0, 1, 2 and 4 are actualized after reboot.

Sensor period is as follows:

| Number | Period   |
|--------|----------|
| 0      | Default  |
| 1      | 10 sec   |
| 2      | 30 sec   |
| 3      | 1 min    |
| 4      | 2 min    |
| 5      | 5 min    |
| 6      | 10 min   |
| 7      | 30 min   |
| 8      | 1 hour   |
| 9      | 2 hours  |
| 10     | 5 hours  |
| 11     | 12 hours |

```
# E.g., to set sensor period of node 001122fffe334455 to 5 minutes, compose the following message:
# 02  Type = 0 (Set param), Len = 2 (2 bytes follow: 1 for param index, 1 for value)
# 03  Param = 03 (Sensor period)
# 05  Value = 05 (5 min)
# This gives us 020305 in hex, which encoded as base-64 is "AgMF".
# To send the message to the node, issue the following command:
mosquitto_pub -h SUPERNODE_URL -p 8883 -u "ADMIN_USERNAME" -P "ADMIN_PASSWORD" -t "application/201/device/001122fffe334455/tx" -m '{"confirmed":true,"fPort":1,"data":"AgMF"}' --capath /etc/ssl/certs
```
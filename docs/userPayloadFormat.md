---
id: payloadFormat
title: Payload Format
sidebar_label: Payload Format
---

## Uplink Payload Data Format

The payload is consisting of several commands in a Type-Length-Value (TLV) format. The first byte is consisting of Type (bits [7:4]), defining the command, and Length (bits [3:0]), the length of the arguments in bytes. If the Length bits are 0xF (binary 1111), the command has its length specified in bits [5:0] of the second byte.

| Number | Name            | Length | Description                                                  |
| ------ | --------------- | ------ | ------------------------------------------------------------ |
| 0      | Param value     | >=2    | Response to the "Get params" command. The first byte is the param number, the rest are the value. |
| 1      | Sensor data     | >=1    | Sensor data.                                                 |
| 2      | Battery level   | 1      | Battery level in 10mV steps from 2V (0 = 2V, 255 = 4.55V).   |
| 3      | Battery Percent | 1      | Battery level in percent (0 to 100).                         |
| 4      | Event data      | >=1    | Event data                                                   |



### Sensor Data

Sensor data consists of a byte signifying the sensor type, and zero or more bytes of sensor data. The defined types and corresponding data formats are:

| Number | Name        | Length      | Description                                                  |
| ------ | ----------- | ----------- | ------------------------------------------------------------ |
| 0      | unknown     | 0           | No data.                                                     |
| 1      | gps         | 1 or 11     | GPS coordinates.                                             |
| 2      | temp        | 1 or 2 or 4 | Temperature in degrees Celsius.                              |
| 3      | humi        | 1 or 2 or 4 | Relative humidity in %RH.                                    |
| 4      | pressure    | 4           | Barometric pressure in hPa.                                  |
| 5      | pm10        | 4           | PM10 Concentration in μg/m3.                                 |
| 6      | pm2.5       | 4           | PM2.5 Concentration in μg/m3.                                |
| 7      | tvoc        | 4           | VOC Concentration in ppb.                                    |
| 8      | no2         | 4           | Nitrogen Dioxide Concentration in ppm.                       |
| 9      | co2         | 4           | Carbon Dioxide Concentration in ppm.                         |
| 10     | airFlow     | 4           | Air Flow Rate (Wind Speed) in m/s.                           |
| 11     | voltage     | 1 or 2 or 4 | Voltage in V.                                                |
| 12     | current     | 1 or 2 or 4 | Electric Current in A.                                       |
| 13     | power       | 1 or 2 or 4 | Electric Power in W.                                         |
| 14     | powerUsage  | 4           | Electric Power usage in kWh.                                 |
| 15     | waterUsage  | 4           | Water usage in Kilolitres.                                   |
| 16     | speed       | 4           | Movement Speed in m/s.                                       |
| 17     | rotation    | 4           | Rotational speed in RPM.                                     |
| 18     | counter     | 4           | A generic counter in a 32-bits unsigned value.               |
| 19     | digital     | 1           | A generic digital value.<br>0: Low or OFF, 1: High or ON, -1 Unknown or Invalid. |
| 254    | uplinkPower | 1           | Exact value of TX Power in dBm.                              |



#### GPS data format

When data length is 1

| Offset | Length | Description                                                                                                                                                                                                      |
|--------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | 1      | Indicates whether the node has moved since last GPS fix.  Possible values are:<br>&nbsp;&nbsp;&nbsp;&nbsp;0: Node is stable since last GPS fix<br>&nbsp;&nbsp;&nbsp;&nbsp;1: Node has moved, or has not received a GPS fix since boot; waiting for GPS fix |

When data length is 11

| Offset | Length | Description                                                  |
| ------ | ------ | ------------------------------------------------------------ |
| 0      | 1      | $GPGGA Position Fix Indicator.  Possible values are: <br>* 0 Fix not available or invalid<br> * 1 GPS SPS Mode, fix valid<br> * 2 Differential GPS, SPS Mode, fix valid <br>* 6 Dead Reckoning Mode, fix valid |
| 1      | 4      | Latitude in 1/1000 of minutes, as little-endian int32. Positive is north, negative is south. To get the value in degrees, divide by 600000. |
| 5      | 4      | Longitude in 1/1000 of minutes, as little-endian int32. Positive is east, negative is west. To get the value in degrees, divide by 600000. |
| 9      | 2      | Altitude above geoid mean sea level in decimeters (0.1m), as little-endian int16. |



#### Data format for 1 byte value

It is a signed 8-bits integer (int8_t), giving the range between -128 and +127.

```javascript
// Decoding
if (offset_0 > 0x7f) {
  value = ((offset_0 ^ 0xff) + 1) * -1;
}
else {
  value = offset_0;
}
```



#### Data format for 2 bytes value

It is a signed 16-bits fixed point number. Offset 0 is the sign bit and integer part. Offset 1 is the fractional part.

```javascript
// Decoding in Javascript
let raw_value = (offset_0 << 8) | offset_1;
if (raw_value > 0x7fff) {
  value = ((raw_value ^ 0xffff) + 1) * -1;
}
else {
  value = raw_value;
}
value = value / 256;
```



#### Data format for 4 bytes value

It is a 32-bits floating point number (IEEE 754). Offset 0 is the MSB.

For example, a value of 54.12 will has a 32-bits value of 0x42587ae1.

The payload will become <0x42><0x58><0x7a><0xe1>.

```javascript
// Decoding in Javascript
let raw_value = (offset_0 << 24) | (offset_1 << 16) | (offset_2 << 8) | offset_3;
let v_temp = new DataView(new ArrayBuffer(4))
v_temp.setUint32(0, raw_value)
value = v_temp.getFloat32(0)
```



The NAN (Not A Number) (0x7fc00000), means the sensor value is unknown or invalid.



### Event Data

Event data is information about change that occurs at a point in time. A event will contain the type value and additional event data.

| Number | Name          | Length | Description                                                  |
| ------ | ------------- | ------ | ------------------------------------------------------------ |
| 0      | unknown       | 0      | No data.                                                     |
| 11     | opened        | 1      | The unit is opened by a user. Data is the user ID.           |
| 12     | specialOpened | 0      | The unit is opened in a special way. For example, a key or button. |
| 13     | forceOpened   | 0      | The unit is opened in a abnormal way.                        |



## Downlink Payload Data Format

Payload is consisting of several commands in a Type-Length-Value (TLV) format. The first byte is consisting of Type (bits [7:4]), defining the command, and Length (bits [3:0]), the length of the arguments in bytes. If the Length bits are 0xF (binary 1111), the command has its length specified in bits [5:0] of the second byte.

| Number | Name           | Length | Description                                                  |
| ------ | -------------- | ------ | ------------------------------------------------------------ |
| 0      | Get params     | 1      | Get parameter described by first byte.                       |
| 1      | Set params     | >=2    | Set parameter described by first byte to the value specified in the rest of the message. |
| 2      | Reboot         | 0      | Reboot the node immediately.                                 |
| 1      | Reboot/upgrade | 1      | Reboot the node after the specified timeout; optionally turn BLE and SUOTA on for upgrades. The argument is as follows:bit [7]:0: just reboot1: BLE onbits [6:3]: Reservedbits [2:0]: Timeout0: TBD1: 5 minutes2: 15 minutes3: 30 minutes4: 1 hour5: 2 hours6: 4 hours7: TBD |



## Parameters

| Number | Name    | Length | Description                                                  |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| 0      | deveui  | 6      | DevEUI-48 and BLE MAC address (MSBF)<br><i>Only for DevKit. Please don't use it at final product.</i> |
| 1      | appeui  | 8      | AppEUI-64 (MSBF)<br/><i>Only for DevKit. Please don't use it at final product.</i> |
| 2      | appkey  | 16     | AppKey (write-only)<br/><i>Only for DevKit. Please don't use it at final product.</i> |
| 3      | period  | 1      | Sensor period                                                |
| 4      | sf      | 1      | Minimal LoRa Spread Factor (valid values: 7-12)              |
| 5      | version | 2      | Version number.<br>01 00 => V1.0                             |

Parameters 0, 1, 2 and 4 are actualized after reboot.

Sensor period is as follows:

| Number | Period   |
| ------ | -------- |
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


---
id: deviceProfiles
title: Device Profile Management
sidebar_label: Device Profiles
---
A Device Profile defines the device capabilities and boot parameters that are needed by the Network Server for setting the LoRaWAN® radio access service. These information elements shall be provided by the end-device manufacturer.

When creating a Device Profile, the supernode will create the actual profile on the selected network-server, and will keep a reference record so it knows to which organization it belongs.

Note: changes made to some of the fields will require the reactivation of the device.

## Payload Codecs
**Note:** the raw ```base64``` encoded payload will always be available, even when a codec has been configured.

## Cayenne LPP
When selecting the Cayenne LPP codec, ChirpStack Application Server will decode and encode following the [Cayenne Low Power Payload](https://mydevices.com/cayenne/docs/lora/) specification.

## Custom JavaScript codec functions
When selecting the Custom JavaScript codec functions option, you can write your own (JavaScript) functions to decode an array of bytes to a JavaScript object and encode a JavaScript object to an array of bytes. Package [otto](https://github.com/robertkrimen/otto), which targets ES5, is used as a JavaScript interpreter, so ES6 features (e.g. Typed Arrays) are not supported.

## Decoder function skeleton
```js
// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes, variables) {
  return {};
}
```
## Encoder function skeleton

```js
// Encode encodes the given object into an array of bytes.
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an array of bytes, e.g. [225, 230, 255, 0]
function Encode(fPort, obj, variables) {
  return [];
}
```

---

*Our user documentation is adapted from the open-source project [Chirpstack](https://www.chirpstack.io/application-server/use/)*

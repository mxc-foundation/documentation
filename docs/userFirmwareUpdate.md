---
id: firmwareUpdate
title: Firmware update over the air
sidebar_label: Firmware Updates
---

**Note:** this is an experimental feature, the implementation including the API might change!

Firmware update over the air (sometimes called FUOTA) makes it possible to push firmware updates to one or multiple devices, making use of multicast. It it standardized by the following LoRa&reg Alliance specifications:

LoRaWAN® Application Layer Clock Synchronization
LoRaWAN® Fragmented Data Block Transport
LoRaWAN® Remote Multicast Setup
It is important to note that the implementation of this feature by devices is optional and therefore, unless your device explicitly states that it implements FUOTA it is safe to assume it does not!

## Starting a firmware update job
Currently ChirpStack Application Server only supports firmware update jobs to single devices. When navigating to [Devices](userDevices.md), you will find a Firmware tab, where you will find the Create Firmware Update Job button.

The following information needs to be provided:

* **Name**: a descriptive name for the update job.
* **Firmware file**: this is the file containing the update (vendor specific).
* **Redundant frames**: the number of extra redundant frames to add to the transmission (more redundancy means that it is more likely a device can recover from packet loss).
* **Unicast timeout**: this is the number of seconds that ChirpStack Application Server will wait for the device to respond to downlink commands.
* **Data-rate**: the used data-rate for the multicast transmission.
* **Frequency**: the frequency used for the multicast transmission.
* **Multicast-group type**: the multicast-group type used.
* **Multicast timeout**: the maximum time the device will enable the configured multicast session (in most cases the device will close the session on receiving the last frame).

## Resources
### ARM Mbed
An example ARM Mbed FUOTA implementation can be found at: [https://github.com/ARMmbed/mbed-os-example-lorawan-fuota](https://github.com/ARMmbed/mbed-os-example-lorawan-fuota).

To obtain the Firmware file (```xdot-blinky-signed.bin```), you must use the following command:

```lorawan-fota-signing-tool sign-binary -b example-firmware/xdot-blinky.bin -o xdot-blinky-signed.bin --output-format bin --override-version```

Refer to the above repository for more information and instructions.
---
*Our user documentation is adapted from the open-source project [Chirpstack](https://www.chirpstack.io/application-server/use/)*
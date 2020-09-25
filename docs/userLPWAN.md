---
id: userLPWAN
title: Managing LPWAN Gateways and Devices
sidebar_label: Managing Gateways & Devices
---

The gateway-profiles configure your gateways to listen on a set of frequencies (given that you have configured this too in your LoRa Gateway Bridge configuration).

The [[network_server.network_settings.extra_channels]] configure extra channels (that are not defined by the LoRaWAN Regional Parameters specification) for your device to transmit on.

The enabled_uplink_channels define which channel-numbers as specified by the LoRaWAN Regional Parameters are enabled.

- When you prefer to configure your gateway manually (by editing global_conf.json or local_conf.json), then you can forget about the gateway-profiles completely :slight_smile:

Examples:

## US band 

loraserver.toml
```
enabled_uplink_channels=[0, 1, 2, 3, 4, 5, 6, 7]
```
### Gateway-profile
Configure the frequencies that map to channels 0 - 7.

## EU band

loraserver.toml
```
enabled_uplink_channels=[] (when left blank this implies all uplink channels active, thus enabled_uplink_channels=[0, 1, 2]
[[network_server.network_settings.extra_channels]] use this to configure channel 3 - 7 (optional extra channels).
```
### Gateway-profile
Configure the channels that map to 0 - 2 (default LoRaWAN channels) + optionally also the frequencies of channel 3 - 7 that you defined yourself.

[Source and further information](https://forum.chirpstack.io/t/gateway-profile-enabled-channels-lora-server-extra-channels/1123/19)

This documentation is under development. If you wish to contribute, feel free to join us in our [documentation github repo](https://github.com/mxc-foundation/documentation).

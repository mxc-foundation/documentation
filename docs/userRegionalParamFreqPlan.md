---
id: userRegParamFreqPlan
title: Regional Parameters and Frequency Plan
sidebar_label: Regional Parameters and Frequency Plan
---
## Regional Parameters
LPWAN operates in an unlicensed frequency spectrum in sub-gigahertz range. Although it is unlicensed which means the user doesn't have to apply for permission to transmit and pay 
huge license fees, it is still regulated and everyone needs to follow the rules imposed by the radio communication authorities of the given country where the device operates. Because unlicensed spectrum is a common good, following the rules ensures that no single entity will prohibit others from accessing it. Another example of an unlicensed spectrum is 2.4GHz and 5GHz used by WiFi, Bluetooth and many other protocols. LPWAN prefers using sub-gigahertz frequencies because it allows for communication over longer distances but because of this longer propagation, the regulations are stricter than short range communication bands. To make things even more complicated different authorities impose different rules, and allocate different  bands depending on the region. To help all LPWAN adopters to navigate this complicated labyrinth of rules, a common framework has been developed by the Lora Alliance and is published in a document called the Regional Parameters available on their [website](https://lora-alliance.org/lorawan-for-developers).

MXC Supernode servers are designed and configured to comply with the Regional Parameters guidelines, nonetheless they don't define all aspects LPWAN communication and still leave some freedom to network server operators in regards to the specific channel bands, number of channels and other parameters. For example US902-928 region specification used in USA and other regions respecting FCC authority defines 64 possible frequencies channels that can be used by devices but most of existing LPWAN Gateways can only use 8 or 16 of those channels and it is up to the network operator to chose which one to use.

## Frequency Plans
Based on Regional Parameters MXC defines the following, default Frequency Plans for the Super Nodes:

### EU863-870
#### Uplink

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 868.1 MHz | SF7BW125 to SF12BW125|
| 1 | 868.3 MHz | SF7BW125 to SF12BW125|
| 2 | 868.5 MHz | SF7BW125 to SF12BW125|
| 3 | 868.8 MHz | SF7BW125 to SF12BW125|
| 4 | 864.7 MHz | SF7BW125 to SF12BW125|
| 5 | 864.9 MHz | SF7BW125 to SF12BW125|
| 6 | 865.1 MHz | SF7BW125 to SF12BW125|
| 7 | 865.3 MHz | SF7BW125 to SF12BW125|
| 8 | 868.3 MHz | SF7BW250|
| 9 | 868.8 MHz | FSK|


#### Downlink

1. Uplink channels 0-9 (RX1)
2. 869.525 - SF9BW125 (RX2 downlink only)

__Note:__ Some gateways that use LBT (Listen Before Talk) can listen only to 8 downlink channels. In case the RX2 window 869.525 MHz is being used, this frequency needs to be included in the LBT configuration, and one of the channels from 0 to 7 has to be sacrificed or used as uplink only. 


### US902-928

#### Uplink

US902-928 uplink channels are defined as follows:

> **Upstream** – 64 channels numbered 0 to 63 utilizing LoRa 125 kHz BW varying from DR0 to DR3, using coding rate 4/5, starting at 902.3 MHz and incrementing linearly by 200 kHz to 914.9 MHz  
**Upstream** – 8 channels numbered 64 to 71 utilizing LoRa 500 kHz BW at DR4 starting at 903.0 MHz and incrementing linearly by 1.6 MHz to 914.2 MHz

In case of 8 channel gateways these frequencies are used by default:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 8 | 903.9 MHz | SF7BW125 to SF12BW125|
| 9 | 904.1 MHz | SF7BW125 to SF12BW125|
| 10 | 904.3 MHz | SF7BW125 to SF12BW125|
| 11 | 904.5 MHz | SF7BW125 to SF12BW125|
| 12 | 904.7 MHz | SF7BW125 to SF12BW125|
| 13 | 904.9 MHz | SF7BW125 to SF12BW125|
| 14 | 905.1 MHz | SF7BW125 to SF12BW125|
| 15 | 905.3 MHz | SF7BW125 to SF12BW125|
| 65 | 904.6 MHz | SF8BW500|

#### Dowlink
| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 923.3 MHz | SF7BW500 to SF12BW500|
| 1 | 923.9 MHz | SF7BW500 to SF12BW500|
| 2 | 924.5 MHz | SF7BW500 to SF12BW500|
| 3 | 925.1 MHz | SF7BW500 to SF12BW500|
| 4 | 925.7 MHz | SF7BW500 to SF12BW500|
| 5 | 926.3 MHz | SF7BW500 to SF12BW500|
| 6 | 926.9 MHz | SF7BW500 to SF12BW500|
| 7 | 927.5 MHz | SF7BW500 to SF12BW500|

### CN470-510

#### Uplink

CN470-510 uplink channels are defined as follows:
> **Upstream** – 96 channels numbered 0 to 95 utilizing LoRa 125 kHz BW varying from
1026 DR0 to DR5, using coding rate 4/5, starting at 470.3 MHz and incrementing linearly
1027 by 200 kHz to 489.3 MHz.

By default the following uplink channels are used by the Super Node:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 470.3 MHz | SF7BW125 to SF12BW125|
| 1 | 470.5 MHz | SF7BW125 to SF12BW125|
| 2 | 470.7 MHz | SF7BW125 to SF12BW125|
| 3 | 470.9 MHz | SF7BW125 to SF12BW125|
| 4 | 471.1 MHz | SF7BW125 to SF12BW125|
| 5 | 471.3 MHz | SF7BW125 to SF12BW125|
| 6 | 471.5 MHz | SF7BW125 to SF12BW125|
| 7 | 471.7 MHz | SF7BW125 to SF12BW125|
|  | 471.4 MHz | SF7BW500|
|  | 471.9 MHz | FSK|

#### Downlink

The downlink frequency channel is defined as a function of uplink channel used in the following way:
> **RX1 Channel Number** = **Uplink Channel Number** modulo **48**, for example, when transmitting channel number is 49, the rx1 channel number is 1.  
The **RX2** (second receive window) settings uses a fixed data rate and frequency.
Default parameters are **505.3 MHz / DR0** (SF12BW125).

Where the downlink channels are definde as:

>**Downstream** – 48 channels numbered 0 to 47 utilizing LoRa 125 kHz BW varying from DR0 to DR5, using coding rate 4/5, starting at 500.3 MHz and incrementing linearly by 200 kHz to 509.7 MHz



### AU915-928

#### Uplink

AU915-928 uplink channels are defined as follows:

> **Upstream** – Upstream – 64 channels numbered 0 to 63 utilizing LoRa 125 kHz BW varying from DR0 to DR5, using coding rate 4/5, starting at 915.2 MHz and incrementing linearly by 200 kHz to 927.8 MHz  
**Upstream** – 8 channels numbered 64 to 71 utilizing LoRa 500 kHz BW at DR6 starting at 915.9 MHz and incrementing linearly by 1.6 MHz to 927.1 MHz  

In case of 8 channel gateways these frequencies are used by default:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 8 | 916.8 MHz | SF7BW125 to SF12BW125|
| 9 | 917.0 MHz | SF7BW125 to SF12BW125|
| 10 | 917.2 MHz | SF7BW125 to SF12BW125|
| 11 | 917.4 MHz | SF7BW125 to SF12BW125|
| 12 | 917.6 MHz | SF7BW125 to SF12BW125|
| 13 | 917.8 MHz | SF7BW125 to SF12BW125|
| 14 | 918.0 MHz | SF7BW125 to SF12BW125|
| 15 | 918.2 MHz | SF7BW125 to SF12BW125|
| 65 | 917.5 MHz | SF8BW500|

#### Dowlink
| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 923.3 MHz | SF7BW500 to SF12BW500|
| 1 | 923.9 MHz | SF7BW500 to SF12BW500|
| 2 | 924.5 MHz | SF7BW500 to SF12BW500|
| 3 | 925.1 MHz | SF7BW500 to SF12BW500|
| 4 | 925.7 MHz | SF7BW500 to SF12BW500|
| 5 | 926.3 MHz | SF7BW500 to SF12BW500|
| 6 | 926.9 MHz | SF7BW500 to SF12BW500|
| 7 | 927.5 MHz | SF7BW500 to SF12BW500|
| 8 | 923.3 MHz | SF12BW500 (RX2)|

### AS923

#### Uplink
Default Channels:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 923.2 MHz | SF7BW125 to SF12BW125|
| 1 | 923.4 MHz | SF7BW125 to SF12BW125|


Extra Channels:
| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 2 | 922.2 MHz | SF7BW125 to SF12BW125|
| 3 | 922.4 MHz | SF7BW125 to SF12BW125|
| 4 | 922.6 MHz | SF7BW125 to SF12BW125|
| 5 | 923.8 MHz | SF7BW125 to SF12BW125|
| 6 | 923.0 MHz | SF7BW125 to SF12BW125|
| 7 | 922.0 MHz | SF7BW125 to SF12BW125|
| 8 | 922.1 MHz | SF7BW250|
| 9 | 921.8 MHz | FSK|

#### Downlink

1. Uplink channels 0-9 (RX1)
2. 923.2 MHz / DR2 - SF10BW125 (RX2)
   
### KR920-923

#### Uplink
Default Channels:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 922.1 MHz | SF7BW125 to SF12BW125|
| 1 | 922.3 MHz | SF7BW125 to SF12BW125|
| 2 | 922.5 MHz | SF7BW125 to SF12BW125|

Extra Channels:
| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 3 | 922.7 MHz | SF7BW125 to SF12BW125|
| 4 | 922.9 MHz | SF7BW125 to SF12BW125|
| 5 | 923.1 MHz | SF7BW125 to SF12BW125|
| 6 | 923.3 MHz | SF7BW125 to SF12BW125|

#### Downlink

1. Uplink channels 0-6 (RX1)
2. 921.9 MHz / DR0 - SF12BW125 (RX2 downlink only)


### IN865-867

#### Uplink
Default Channels:

| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 0 | 865.0625 MHz | SF7BW125 to SF12BW125|
| 1 | 865.4025 MHz | SF7BW125 to SF12BW125|
| 2 | 865.9850 MHz | SF7BW125 to SF12BW125|

Extra Channels:
| Channel | Frequency | Data Rate |
|----------|------------|------------------------------------|
| 3 | 865.6 MHz | SF7BW125 to SF12BW125|
| 4 | 865.8 MHz | SF7BW125 to SF12BW125|
| 5 | 966.2 MHz | SF7BW125 to SF12BW125|
| 6 | 966.4 MHz | SF7BW125 to SF12BW125|

#### Downlink

1. Uplink channels 0-6 (RX1)
2. 866.550 - SF10BW125 (RX2)
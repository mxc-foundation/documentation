---
id: startingDev
title: Getting Started
sidebar_label: Getting Started
---


LPWAN App Server is an open-source LoRaWAN application-server, part of the
[LPWAN Server](https://www.loraserver.io/) project. It is responsible
for the node "inventory" part of a LoRaWAN infrastructure, handling of received
application payloads and the downlink application payload queue. It comes
with a web-interface and API (RESTful JSON and gRPC) and supports authorization
by using JWT tokens (optional). Received payloads are published over MQTT
and payloads can be enqueued by using MQTT or the API.

If you're interested in the pure Chirsptack experience, or need to troubleshoot a build problem, check out the links below. Otherwise head over to the [MXC LPWAN App Server Quickstart Guide](https://mxc.wiki/docs/en/startingDev).

# Supernode component downloads

## Component links

* [LPWAN Gateway Bridge](https://www.chirpstack.io/gateway-bridge/overview/)
* [LPWAN Gateway Config](https://www.chirpstack.io/guides/first-gateway-device/)
* [LPWAN Server](https://www.chirpstack.io/network-server/overview/)
* [LPWAN App Server](https://www.chirpstack.io/application-server/overview/)

## Links

* [Docker image](https://hub.docker.com/r/mxcdocker/supernode)
* [Documentation & screenshots](https://github.com/mxc-foundation/lpwan-app-server.git) and [Getting started](https://github.com/mxc-foundation/lpwan-app-server/blob/master/README.md)
* [Contributing](https://github.com/mxc-foundation/lpwan-app-server.git)
* Support
  * [Overview](https://mxc.wiki/en/help)
  * [Bug or feature requests](https://github.com/mxc-foundation/lpwan-app-server/issues)

## License

LPWAN App Server is distributed under the MIT license. See also
[LICENSE](https://github.com/mxc-foundation/lpwan-app-server/blob/master/LICENSE).

# Fast Q&A
__Q: What to do if I encounter this error:__  
docker.credentials.errors.InitializationError: docker-credential-secretservice not installed or not available in PATH

__A: Open file ~/.docker/config.json , remove line:__  
"credsStore": "secretservice"
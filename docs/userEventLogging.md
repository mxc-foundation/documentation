---
id: eventLogging
title: Event Logging
sidebar_label: Event Logging
---

Supernode Application Server makes it possible to log events sent to the MQTT broker or configured integrations. To use this feature, you fist need to go to the device detail page. Once you are on this page, open the **Device Data** tab.

**Note:** This is for debugging purposes only! Do not use this for integration with your applications.

As soon as you open this page, Supernode Application Server will subscribe to the events of the selected device. Once an event is received, it will be displayed without the need to refresh the page.

## Exposed events
Note that all the displayed data can be expanded by clicking on each key. E.g. **> payload: {} 9 keys** means you can expand this payload item as it has nine sub-items.

The payloads that are exposed are documented by the [Sending and Receiving page](https://www.chirpstack.io/application-server/integrate/sending-receiving/). You will also find examples on this page.

---

*Our user documentation is adapted from the open-source project [Chirpstack](https://www.chirpstack.io/application-server/use/)*
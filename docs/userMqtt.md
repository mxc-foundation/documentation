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

After you successfully subscribe to the MQTT broker, then you would possibly see something in your console as follow:

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

Please read the session of "Payload Format" to decode the content.



## Publishing

To send messages to the nodes, publish to MQTT topic.
The default topic for scheduling downlink payloads is:
```
application/[ApplicationID]/device/[DevEUI]/command/down
```
The message format should be as follow:
```
{
    "confirmed": true,                        // whether the payload must be sent as confirmed data down or not
    "fPort": 10,                              // FPort to use (must be > 0)
    "data": "...."                            // base64 encoded data (plaintext, will be encrypted by ChirpStack Network Server)
    "object": {                               // decoded object (when application codec has been configured)
        "temperatureSensor": {"1": 25},       // when providing the 'object', you can omit 'data'
        "humiditySensor": {"1": 32}
    }
}
```
The example of publishing with mosquitto_pub looks as this:

```
# To send a message to a node, issue the following command:
mosquitto_pub -h SUPERNODE_URL -p 8883 --capath /etc/ssl/certs -u "USERNAME" -P "PASSWORD" -i -t "applications/APP_ID/device/DEV_UI/command/down" -m '{"confirmed": false, "fPort":1,"data":"BASE64"}'
```


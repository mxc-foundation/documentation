---
id: quickstartDev
title: Quickstart
sidebar_label: Quickstart
---

# LPWAN App Server

## Environment

#### Set up docker
- [Install Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)  
Just follow __Install using the repository / SET UP THE REPOSITORY__, no need to install docker engine community

- [Install docker-compose](https://docs.docker.com/compose/install/)
Just follow __Install Compose on Linux systems__

- Add user to docker group
```bash
sudo usermod -aG docker $USER
```

## Clone the repo and fetch latest develop branch:

```bash
git clone https://github.com/mxc-foundation/lpwan-app-server.git
cd lpwan-app-server
git checkout develop
git pull
```
## Start container and build service with local database&mqtt
- Outside of container, do
```bash
$LPWAN-APP-SERVER-PATH/appserver local
```
After building, the service will start running with config file ./configuration/lora-app-server.toml.  

- When you stop the service with Ctrl+c, you wil be inside of the container, after modifying the code, if you wanna rebuild, just stay inside of container and do:
```bash
$LPWAN-APP-SERVER-PATH/appserver build
```
Again, after building, the service will start running with config file ./configuration/lora-app-server.toml.  

You can visit http://localhost:8080 in your browser to preview the service.

> __Hint:__ if you have any difficulty building UI, try inside of container:  
> ```bash
> cd $LPWAN-APP-SERVER-PATH/ui
> rm package-lock.json
> npm install
> cd ..
> ./appserver build
> ```

# MXProtocol Server

## Clone the repo and fetch latest develop branch:
```bash
git clone https://github.com/mxc-foundation/mxprotocol-server.git
cd mxprotocol-server
git checkout develop
git pull
```

## Start container and build service with local database
- Outside of container, do
```bash
$MXPROTOCOL-SERVER-PATH/mxprotocol-server local_database
```
After building, the service will start running with config file $MXPROTOCOL-SERVER-PATH/configuration/mxprotocol-server.toml.  

- When you stop the service with Ctrl+c, you wil be inside of the container, after modifying the code, if you wanna rebuild, just stay inside of container and do:
```bash
$MXPROTOCOL-SERVER-PATH/mxprotocol-server build
```
Again, after building, the service will start running with config file $MXPROTOCOL-SERVER-PATH/configuration/mxprotocol-server.toml. 

> __Hint:__ if you want to connect the appserver and mxprotocol server, you need to run this __outside__ the containers:
>```bash
> docker ps
> docker network ls
>```
>You can find the network names and container IDs in the output and then run this
>```bash
> docker network connect NETWORK_NAME_APPSERVER MXPROTOCOL_CONTAINER_ID
> docker network connect NETWORK_NAME_MXPROTOCOL APPSERVER_CONTAINER_ID
>```
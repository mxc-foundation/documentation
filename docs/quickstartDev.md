---
id: quickstartDev
title: Quickstart
sidebar_label: Quickstart
---

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
git clone git@github.com:mxc-foundation/documentation.git 
cd lpwan-app-server
git checkout develop
git pull
```
## Start container and build service with local database&mqtt
- Outside of container, do
```bash
$LPWAN-APP-SERVER-PATH/appserver local_database
```
After building, the service will start running with config file ./configuration/lora-app-server.toml.  

- When you stop the service with Ctrl+c, you wil be inside of the container, after modifying the code, if you wanna rebuild, just stay inside of container and do:
```bash
$LPWAN-APP-SERVER-PATH/appserver build
```
Again, after building, the service will start running with config file ./configuration/lora-app-server.toml.  

You can visit http://localhost:8080 in your browser to preview the service.

## Build service with remote database&mqtt
- Outside of container, do
```bash
$LPWAN-APP-SERVER-PATH/appserver remote_database REMOTE_SEVER
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
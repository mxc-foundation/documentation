---
id: development
title: Development
sidebar_label: Development
---

## Stop any existing processes in other terminal tabs

Check that you haven't left any existing instances of lpwan-app-server running (i.e. if you're already running the UI with `npm start`).

## Change to compatible version of Node.js

Since the Docker container will use Node.js v10.16.3, switch to that version on your local machine.
[Node Version Manager](https://github.com/nvm-sh/nvm#install--update-script) makes this convenient to do:

```bash
nvm install v10.16.3 &&
nvm use v10.16.3
```

## Frequently apply latest from feature branch into your task branch:

```
git checkout feature/MCL-117 &&
git pull --rebase origin feature/MCL-117
git checkout luke/MCL-118-page-network-servers
git rebase -i feature/MCL-117
```

> Note: An alternative to running `git rebase -i feature/MCL-117` is to merge and resolve conflicts instead with `git merge feature/MCL-117` 

## Debugging with live reload:

After the LPWAN App Server is built and running from the Docker container,
if you just go to http://localhost:8080, then you won't get live reload support.
So to enable debugging and live reload, additionally run the following (outside the
Docker container):

```bash
cd lpwan-app-server &&
cd ui/ &&
npm start
```

Then open in your web browser: http://localhost:3000

Now when you make changes it will automatically refresh


## Library Requirements

All libraries used in the UI should provide React Native support

## Database Access

Try using a PostgreSQL GUI to easily resolve issues in the test database

Example:
* Download http://www.psequel.com/
* Enter connection details that are either in your .env file, or in your custom configuration file: configuration/lora-app-server.toml
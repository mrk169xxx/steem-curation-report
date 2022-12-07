# Steem Curation Report

Steem curation report is a small project that will allow you to automatically generate a report of the posts that were curated by _x_ account for the last 24 hours.

# Requirements

- node version 16
- npm 
- pm2

# Install

Next I will explain how to install all the dependencies of the project.

## 1- Install NodeJS

Run the following commands

```
sudo apt update && sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 1.2- Verify that nodejs and npm are installed

Run the following commands

```
node -v
npm -v
```

## Install pm2

Run the following command

```
npm install pm2 -g
```

## Install project dependencies

Within the root folder of the project, that is, where this file is, execute the following command.

```
npm install
```

# Configure and run the bot

## Configure the bot

You must create a file called config.js inside the folder of the project and copy all the code from the config-example.js file, then you must complete several options inside the config.js

## Run the bot

Once you have installed everything the bot needs and configured it, then you can run it.

Within the root folder of the project, that is, where this file is, execute the following command.

```
pm2 start curationreport.js
```

# See the running bot

```
pm2 list
```

# See in detail the bot running

Use `pm2 show <id|name>` to get more details about an app

Example:
```
pm2 show bot
```

# View bot messages

Use `pm2 logs <id|name>` to display logs

Example:
```
pm2 logs bot
```

# Stop the bot

This only stops the bot but it will still appear on run
```
pm2 list
```
Command to remove:
`pm2 stop <id|name>`

Example:
```
pm2 stop bot
```

# Restart the bot

`pm2 restart <id|name>`

Example:
```
pm2 restart bot
```

# Remove the bot from the process list

Stop and delete a process from pm2 process list

`pm2 delete|del <id|name>`

Example:
```
pm2 delete bot
```

### Notes

* Users can only post on Steem once every 5 minutes. If some other activities or reports are planned at the same time, they need to be time spaced.

### Contribution & Features Request

The project is open for contributions and features requests.

For inquiries and discussion: https://discord.gg/Hf7saBFrn4

### License

GNU GENERAL PUBLIC LICENSE Version 3.

Brought to you by the Symbionts Team.

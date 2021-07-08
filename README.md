### Steem Curation Report

Steem curation report is a small project that will allow you to automatically generate a report of the posts that were curated by _x_ account for the last 24 hours.

### Requeriments

* steem,
* crontab,
* nodejs,
* node-fetch,
* and moment.

### Instalation Instrunctions

* ```git clone https://github.com/Symbiont-s/steem-curation-report```

* If nodejs and npm are not already installed on your server, you can install both of them by doing:

```
sudo apt-get update && apt-get upgrade
```

```
sudo apt install nodejs
```

* npm is supposed to be included with nodejs, is this was not the case for some reason, do:

```
sudo apt install npm
```

* Navigate to inside the folder of the project ```cd steem-curation-report``` then do ```npm i```. in case of an issue you can install the depndencies manually by doing:

```npm install steem --save```

```npm install node-fetch```

```npm install moment```

* Edit steem-curation-report.js using vim or nano by doing ```vim curationreport.js``` or ```nano curationreport.js```, add the name of your account that is used to vote with, your posting key, your body text, tags, and beneficiaries if needed. If you are not used to using nano or vim, the file can be easily edited on a desktop by using  Notepad++.

* Then you can test your JS file by doing ```node steem-curation-report.js```. An example of the original output can be seen [here](https://steemit.com/ecs/@ecosynthesizer/ecs-curation-report-8-7-2021-id-7158).

### Automate the Reports

* Now that your JS is properly working, you can automate the reports by using Crontab. If Crontab is not already installed on your server, you can install it by doing:

```
sudo apt-get update && apt-get upgrade
```

```
sudo apt-get install cron
```

* You can now add a new cron job and make it run once every 24 hours:

```
crontab -e
```

Chose to proceed with vim or nano, then add the below line, then save and exit.

```
0 0 * * * node /root/steem-curation-report/curationreport.js
```

The path depends on where you have put the folder of the project on your server.

### Notes

* Users can only post on Steem once every 5 minutes. If some other activities or reports are planned at the same time, they need to be time spaced.

### Contribution & Features Request

The project is open for contributions and features requests.

For inquiries and discussion: https://discord.gg/Hf7saBFrn4

### License

GNU GENERAL PUBLIC LICENSE Version 3.

Brought to you by the Symbionts Team.

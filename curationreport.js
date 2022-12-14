// import fetch from "node-fetch";
const steem  = require("steem");
const moment = require('moment');
const cron = require('node-cron');
const fetch  = require("node-fetch");
const cfg = require('./config');

class Methods {
    constructor() {
        let month   = new Date().getMonth() + 1;
        month       = (month < 10)? "0" +  month: month;
        let day     = (new Date().getDate() < 10)? "0" + new Date().getDate() : new Date().getDate();
        this.today  = new Date().getFullYear() + "-" + month + "-" + day;
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
        this.user   = cfg.ACCOUNT;
        this.key    = cfg.POSTING_KEY;
        this.title  = `${cfg.TITLE.title}${cfg.TITLE.withDate ? (this.months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()) : ''}`;
        this.body   = cfg.BODY;
        this.tags          = cfg.TAGS;
        let b = cfg.BENEFICIARIES
        b.sort((a,b) => (a.account > b.account) ? 1 : ((b.account > a.account) ? -1 : 0))
        b.sort((a,b) => a.weight - b.weight)
        this.beneficiaries = {
            beneficiaries: b
        };
    }
    async main() { 
        let t = this; 
        let trx = await this.getAccountHistory('https://api.steemit.com', [this.user,-1, 30]);
        trx = JSON.parse(trx).result.reverse();
        let votes = this.filterByVotes(trx);
        votes     = this.filterByTime(votes);
        // console.log(votes[0]);
        if (votes.length > 0) {
            console.log('votes found');
            let permlink = cfg.TITLE.title.toLowerCase().replace(/\s+/g, '-').split("|").join("-") + new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear() + "-id-" + Math.random().toFixed(4).substring(2);
            console.log(permlink);
            // console.log("ecs-curation-report-" + new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear() + "-id-" + Math.random().toFixed(4).substring(2));
            let tags  = this.tags;
            let meta  = JSON.stringify({tags:tags});
            let header = `
| <center>Thumbnail</center> | <center>User</center> | <center>Post</center> |
| --- | --- | --- |
`; 
            new Promise(async (resolve) => { 
                console.log('Promise started'); 
                let table = header;
                    let str = '';
                    for (let i = 0; i < votes.length; i++) { 
                        let v = votes[i]; 
                        let post = await this.getPost('https://api.steemit.com',v[1].op[1].author,v[1].op[1].permlink);
                        post     = JSON.parse(post).result;
                        let title = (post.title != '')? post.title.replace(/\|/g,'') : post.permlink;
                        let meta  = JSON.parse(post.json_metadata);
                        try {
                            var image = meta.image[0];
                        } catch (err) {
                            var image = "https://cdn.steemitimages.com/DQmZU2oEPwKPdEHQAcCDb3rJSJfS317WQmwna185c7tapyk/r6gsEfp.jpg";
                        }
                        
                        str += `| <center><a href='https://steemit.com/@${v[1].op[1].author}/${v[1].op[1].permlink}'><img src="https://steemitimages.com/128x256/${image}"></a></center> | <center><a href='https://steemit.com/@${v[1].op[1].author}'>@${v[1].op[1].author}</a></center> | <center><a href='https://steemit.com/@${v[1].op[1].author}/${v[1].op[1].permlink}'>${title}</a></center> |
`;
                    } 
                    table += str;
                    resolve(table);
            }).then(table => { 
                console.log('Promise resolved');
                // console.log('====================================');
                // console.log(table);
                // console.log('====================================');
                steem.broadcast.comment(
                    this.key, // posting wif
                    '', // author, leave blank for new post
                    tags[0], // first tag
                    this.user, // username
                    permlink, // permlink
                    this.title, // Title
                    this.body.replace('[POST]', table), // Body of post
                    // json metadata (additional tags, app name, etc)
                    meta,
                    function (err, result) { 
                        if (err) console.log('Failure! ' + err);
                        else {
                            console.log('Report has been created successfully!');
                            if (t.beneficiaries.beneficiaries.length > 0) {
                                let ben = `[[0,${JSON.stringify(t.beneficiaries)}]]`;
                                ben = JSON.parse(ben);
                                let MaxAcceptedPayout = "1000000.000 SBD",
                                percentSteemDollars = 100,
                                allowVotes          = true,
                                allowCuration       = true;
                                steem.broadcast.commentOptions(
                                    t.key,// posting
                                    t.user,// author
                                    permlink, //permlink
                                    MaxAcceptedPayout,
                                    percentSteemDollars,
                                    allowVotes,
                                    allowCuration,
                                    ben,//extensions
                                    function (err3,result) {
                                        if (err3) console.log('Failure! ' + err3);
                                        else console.log('Settings added to post!');
                                    }
                                );
                            }
                        }
                    }
                );
            }).catch(err => console.log("Error waiting." + err) );
            await sleep(1200000);
        }else {
            console.log('no votes found');
            await sleep(1200000);
        }
    }
    filterByVotes(trx){
        let votes = []; 
        trx.forEach(t => { 
            let type   = t[1].op[0];
            let voter  = t[1].op[1].voter;
            let author = t[1].op[1].author;
            if (type == 'vote' && voter == this.user && author != this.user) votes.push(t); 
        });
        return votes;
    }
    filterByTime(votes) {
        let today = []; 
        votes.forEach(v => {
            let time = moment.utc(v[1].timestamp);
            let now  = moment.utc();
            let diff = now.diff(time, 'hours');
            if (diff <= 24) today.push(v);
        });
        return today;
    }
    async getAccountHistory(server, object) {
        return new Promise((resolve, reject) => {
            fetch(server, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"jsonrpc":"2.0", 
                                    "method":"condenser_api.get_account_history",
                                    "params":object, 
                                    "id":1})
            }).then(response => { resolve(response.text());})
            .catch(error => { reject(error); });
        });
    }
    async getPost (server, author, permlink) {
        return new Promise((resolve, reject) => {
            fetch(server, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"jsonrpc":"2.0", 
                                    "method":"condenser_api.get_content",
                                    "params":[author, permlink], 
                                    "id":1})
            }).then(response => { resolve(response.text());})
              .catch(error => { console.log(error); });
        });
    }
}

let m = new Methods();

m.main();

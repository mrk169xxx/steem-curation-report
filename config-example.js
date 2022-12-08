// Put a cron syntax to run the bot constantly
const CRON_RUTINE = '0 0 * * *'

// Steem account name
const ACCOUNT = 'ecosynthesizer'

// Steem private posting key
const POSTING_KEY = '5xxx'

// Tags to use in the post
const TAGS = ['ecs', 'steem', 'curation', 'report', 'symbionts']

// List of beneficiaries
// account: account name
// weight: number from 1 to 99
const BENEFICIARIES = [
    {
        "account": "ecs.pay",
        "weight": 10
    }
]

// Post title
const TITLE = {
    // If it is true, the title of the post will contain the date of publication
    withDate: true,
    // Post title
    title:'ECS Curation Report | '
}

// post body
// It must contain the word [POST] since the table will be placed there
const BODY = `
<center> ![ECS Thumb Two.png](https://cdn.steemitimages.com/DQmfYoeCE1NM9vLmkKnh7hu9MqewEc8J78waWV3dLrU21HU/ECS%20Thumb%20Two.png) </center> <br> <div class="text-justify"> Welcome to the daily report of the Ecosynthesizer project. You will find below a compilation of posts picked by our dedicated community curators. Do not hesitate to check a few of them, you might find something that you really like! 
<center>https://steemitimages.com/100x100/https://cdn.steemitimages.com/DQmTHqfDW2W6MH5sXVEtsnzsfZi4guQC5VtL7irQr8yvShw/Separators.png</center>

[POST]

<center>https://steemitimages.com/100x100/https://cdn.steemitimages.com/DQmTHqfDW2W6MH5sXVEtsnzsfZi4guQC5VtL7irQr8yvShw/Separators.png</center>

<center>The Ecosynthesizer project is brought to you by the [Symbionts](https://steemlogin.com/sign/account-witness-vote?witness=symbionts&approve=true) team</center>
<center><sup>[1000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=1000%20SP) | [2000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=2000%20SP) | [3000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=3000%20SP) | [4000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=4000%20SP) | [5000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=5000%20SP) | [10000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=10000%20SP) | [100000SP](https://steemlogin.com/sign/delegateVestingShares?delegatee=ecosynthesizer&vesting_shares=100000%20SP)</sup></center> </div>`

module.exports = {
    ACCOUNT,
    BENEFICIARIES,
    BODY, 
    CRON_RUTINE,
    POSTING_KEY,
    TAGS,
    TITLE,
}
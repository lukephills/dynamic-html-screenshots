"use strict";
var tweets = require('./tweets.json');
var zoom = 2;

(function screenshotTweet(idx) {
    console.log('take screenshot', (idx+1), 'of', tweets.length);
    
    // get tweet text
    var tweet = tweets[idx].text;
    
    // format tweet time from timestamp
    var t = tweets[idx].timestamp;
    var amPM = getHour(t) > 12 ? 'PM' : 'AM';
    var hour = getHour(t) > 12 ? getHour(t) - 12 : getHour(t);
    var formattedDate = hour + ':' + getMin(t) + ' ' + amPM + ' - ' + getDay(t) + ' ' + getMonth(t) + ' ' + getYear(t);

    // html page as a string with passed in tweet data
    var htmlPage = '<html style="zoom:'+zoom+'"><body style="background-color: white"><link rel="stylesheet" href="https://abs.twimg.com/a/1473376351/css/t1/twitter_core.bundle.css"><link rel="stylesheet" href="https://abs.twimg.com/a/1473376351/css/t1/twitter_more_1.bundle.css"><link rel="stylesheet" href="https://abs.twimg.com/a/1473376351/css/t1/twitter_more_2.bundle.css"><div class="tweet permalink-tweet" style="max-width: 600px"> <div class="content clearfix"> <div class="permalink-header"> <div class="follow-bar"> <div class="user-actions btn-group not-following not-muting can-dm"> <button class="user-actions-follow-button js-follow-btn follow-button btn" type="button"> <span class="button-text follow-text"> <span class="Icon Icon--follow"></span> Follow </span> </button> </div></div><a class="account-group js-account-group js-action-profile js-user-profile-link js-nav" href="/CodePen" data-user-id="517021184"> <img class="avatar js-action-profile-avatar" src="https://pbs.twimg.com/profile_images/769307678745079808/gxouwWDh_400x400.jpg" alt=""> <strong class="fullname js-action-profile-name show-popup-with-id">Lokal Stories</strong> <span class="username"><s>@</s><b>lokal_stories</b></span> </a> </div></div><div class="js-tweet-text-container"> <p class="TweetTextSize TweetTextSize--26px js-tweet-text tweet-text" id="bot-tweetText">'+tweet+'</p></div><div class="js-tweet-details-fixer tweet-details-fixer"> <div class="js-machine-translated-tweet-container"></div><div class="client-and-actions"> <span class="metadata"> <span id="bot-tweetTime">'+formattedDate+'</span> </span> </div></div></div></body></html>';

    // create webpage using phantomjs 
    var page = require('webpage').create();
    page.viewportSize = { width: 600 * zoom, height: 500 * zoom };
    page.clipRect = { top: 0, left: 0, width: 600 * zoom, height: getShotHeight(tweet.length) * zoom };
    page.content = htmlPage;

    // once page is loaded
    page.onLoadFinished = function(status) {
        // take a screenshot and save as a png
        page.render('screenshots/'+(idx+1)+'.png');
        if (idx < tweets.length - 1) { 
            screenshotTweet(idx+1);
        } else {
            // once done, exit phantom
            console.log('Finished screenshots')
            phantom.exit();
        }
    };
})(0);

    
function getShotHeight(length) {
    if (length < 42){
        return 190;
    } else if (length < 80) {
        return 210;
    } else {
        return 250;
    }
}

function getYear(timestamp) {
    return getDate(timestamp)[0];
}

function getMonth(timestamp) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(getDate(timestamp)[1])+1];
}

function getDay(timestamp) {
    return getDate(timestamp)[2];
}

function getDate(timestamp) {
    return timestamp.split(' ')[0].split('-');
}

function getHour(timestamp) {
    var hour = parseInt(getTime(timestamp)[0])
    if (hour === 0) hour = 12;
    return hour;
}

function getMin(timestamp) {
    return getTime(timestamp)[1];
}

function getTime(timestamp) {
    return timestamp.split(' ')[1].split(':');
}
# Take screenshots of local html files

This phantomjs example takes screenshots of html files with dynamically inputted content.
There is a json file with tweet data from Twitter. This code will programatically take screenshots of all the tweets using the `fake-tweet.html` mockup so they look like this:

![tweet mockup](https://raw.githubusercontent.com/lukephills/dynamic-html-screenshots/master/screenshots/img.png)

Install [PhantomJs](http://phantomjs.org/) and then run:

`phantomjs index.js`

This will loop through all the tweets in `tweets.json`, create a tweet mockup using the time and tweet text and then take a png screenshot which will get saved to `/screenshots`.
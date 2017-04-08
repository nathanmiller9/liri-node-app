var keys = require("./keys.js").twitterKeys;
var Twitter = require('twitter');
var request = require('request');
var client = new Twitter(keys);
var spotify = require('spotify');
var fs = require("fs");
var entry = process.argv.splice(3);
var searchItem = "";

var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

for (var i = 0; i < entry.length; i++) {
    if (i > 0 && i < entry.length) {
        searchItem += "+" + entry[i];
    } else {
        searchItem += entry[i];
    }
}

if (searchItem === "" && process.argv[2] === "movie-this") {
    searchItem += "Mr.+Nobody";
}

if (searchItem === "" && process.argv[2] === "spotify-this-song") {
    searchItem += "The Sign Ace";
}

console.log(entry);
console.log(searchItem);


if (process.argv[2] === "spotify-this-song") {
    spotify.search({ type: 'track', query: searchItem }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            for (var i = 0; i < 20; i++) {
                console.log("--------------------");
                console.log("Album Name: " + data.tracks.items[i].album["name"]);
                console.log("Preview URL: " + data.tracks.items[i]["preview_url"]);
                console.log("Name of Song: " + data.tracks.items[i]["name"]);
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                fs.appendFile("../log.txt", "--------------------");
                fs.appendFile("../log.txt", "Album Name: " + data.tracks.items[i].album["name"]);
                fs.appendFile("../log.txt", "Preview URL: " + data.tracks.items[i]["preview_url"]);
                fs.appendFile("../log.txt", "Name of Song: " + data.tracks.items[i]["name"]);
                fs.appendFile("../log.txt", "Artist: " + data.tracks.items[i].artists[0].name);
            }
        }
    });
}

if (process.argv[2] === "my-tweets") {
    var params = { screen_name: 'heyyonate' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("-----------------------");
                fs.appendFile("../log.txt", tweets[i].text);
                fs.appendFile("../log.txt", tweets[i].created_at);
                fs.appendFile("../log.txt", "-----------------------");
            }
        } else {
            console.log("error");
        }
    });
}

if (process.argv[2] === "movie-this") {
    request("http://www.omdbapi.com/?t=" + searchItem + "&tomatoes=true", function(error, response, body) {

        if (!error && response.statusCode === 200) {


            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("Produced in: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1]["Value"]);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
            fs.appendFile("../log.txt", "Title: " + JSON.parse(body).Title);
            fs.appendFile("../log.txt", "Release Year: " + JSON.parse(body).Year);
            fs.appendFile("../log.txt", "The movie's rating is: " + JSON.parse(body).imdbRating);
            fs.appendFile("../log.txt", "Produced in: " + JSON.parse(body)["Country"]);
            fs.appendFile("../log.txt", "Language: " + JSON.parse(body).Language);
            fs.appendFile("../log.txt", "Plot: " + JSON.parse(body).Plot);
            fs.appendFile("../log.txt", "Actors: " + JSON.parse(body)["Actors"]);
            fs.appendFile("../log.txt", "Rotten Tomatoes: " + JSON.parse(body).Ratings[1]["Value"]);
            fs.appendFile("../log.txt", "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        }
    });
}

if (process.argv[2] === "do-what-it-says") {
    fs.readFile("../random.txt", "utf8", function(error, data) {
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        var command = dataArr[0];
        var searchItem = dataArr[1];
        console.log(command);
        console.log(searchItem);

        if (command === 'spotify-this-song') {
            spotify.search({ type: 'track', query: searchItem }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    for (var i = 0; i < 20; i++) {
                        console.log("--------------------");
                        console.log("Album Name: " + data.tracks.items[i].album["name"]);
                        console.log("Preview URL: " + data.tracks.items[i]["preview_url"]);
                        console.log("Name of Song: " + data.tracks.items[i]["name"]);
                        console.log("Artist: " + data.tracks.items[i].artists[0].name);
                        fs.appendFile("../log.txt", "--------------------");
                        fs.appendFile("../log.txt", "Album Name: " + data.tracks.items[i].album["name"]);
                        fs.appendFile("../log.txt", "Preview URL: " + data.tracks.items[i]["preview_url"]);
                        fs.appendFile("../log.txt", "Name of Song: " + data.tracks.items[i]["name"]);
                        fs.appendFile("../log.txt", "Artist: " + data.tracks.items[i].artists[0].name);
                    }
                }
            });
        }
        if (command === "movie-this") {
            request("http://www.omdbapi.com/?t=" + searchItem + "&tomatoes=true", function(error, response, body) {

                if (!error && response.statusCode === 200) {


                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                    console.log("Produced in: " + JSON.parse(body)["Country"]);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body)["Actors"]);
                    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1]["Value"]);
                    console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                    fs.appendFile("../log.txt", "Title: " + JSON.parse(body).Title);
                    fs.appendFile("../log.txt", "Release Year: " + JSON.parse(body).Year);
                    fs.appendFile("../log.txt", "The movie's rating is: " + JSON.parse(body).imdbRating);
                    fs.appendFile("../log.txt", "Produced in: " + JSON.parse(body)["Country"]);
                    fs.appendFile("../log.txt", "Language: " + JSON.parse(body).Language);
                    fs.appendFile("../log.txt", "Plot: " + JSON.parse(body).Plot);
                    fs.appendFile("../log.txt", "Actors: " + JSON.parse(body)["Actors"]);
                    fs.appendFile("../log.txt", "Rotten Tomatoes: " + JSON.parse(body).Ratings[1]["Value"]);
                    fs.appendFile("../log.txt", "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                }
            });
        }
        if (command === "my-tweets") {
            var params = { screen_name: 'heyyonate' };
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    for (i = 0; i < tweets.length; i++) {
                        console.log(tweets[i].text);
                        console.log(tweets[i].created_at);
                        console.log("-----------------------");
                        fs.appendFile("../log.txt", tweets[i].text);
                        fs.appendFile("../log.txt", tweets[i].created_at);
                        fs.appendFile("../log.txt", "-----------------------");
                    }
                } else {
                    console.log("error");
                }
            });
        }
    });
}

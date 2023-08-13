const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // To render the css code in node.
const PORT = process.env.PORT || 8080;

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "d40a6b79329dab9e163d31405cd439bd";
    const units = "metric";
    const url = " https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {
        console.log(response, STATUS_CODES);

        response.on("data", function (responseData) {
            const weatherData = JSON.parse(responseData);
            const temp = weatherData.main.temp;
            const temp1 = weatherData.weather[0].description;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const speed = weatherData.wind.speed;

            console.log(temp);
            console.log(weatherData);
            console.log(temp1);

            const icon = weatherData.weather[0].icon;
            const imageURL = " https://openweathermap.org/img/wn/" + icon + "@2x.png";

            const data = {
                city: query,
                imageURL: imageURL,
                temp: temp,
                temp1: temp1,
                pressure: pressure,
                humidity: humidity,
                speed: speed
            };

            res.render("weather.ejs", data);
        });
    });
});

app.post("/", function (req, res) {

});



app.listen(8080, function () {

    console.log("Server is running on port 8080.");

});


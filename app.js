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

        response.on("data", function (data) {
            const weatherData = JSON.parse(data) // Converts Hexadecimal data to string format.
            const temp = weatherData.main.temp                // JS object
            const temp1 = weatherData.weather[0].description
            console.log(temp);
            console.log(weatherData);
            console.log(temp1);

            const icon = weatherData.weather[0].icon
            const imageURL = " https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<!DOCTYPE html>");
            res.write("<html>");
            res.write("<head>");
            res.write("<title>Weather Report</title>");
            res.write("<style>");
            res.write("body {");
            res.write("background-color: #F0F8FF;");
            res.write("font-family: Arial, sans-serif;");
            res.write("}");
            res.write("h1 {");
            res.write("font-size: 2em;");
            res.write("text-align: center;");
            res.write("}");
            res.write(".weather-info {");
            res.write("display: flex;");
            res.write("justify-content: center;");
            res.write("align-items: center;");
            res.write("}");
            res.write(".weather-icon {");
            res.write("margin-right: 1em;");
            res.write("}");
            res.write("</style>");
            res.write("</head>");
            res.write("<body>");
            res.write("<h1>Current Weather in " + query + "</h1>");
            res.write("<div class='weather-info'>");
            res.write("<div class='weather-icon'>");
            res.write("<img src='" + imageURL + "' alt='weather icon'>");
            res.write("</div>");
            res.write("<div class='weather-description'>");
            res.write("<p>The temperature is <strong>" + temp + " &#8451;</strong></p>");
            res.write("<p>The weather is currently <strong>" + temp1 + "</strong></p>");
            res.write("</div>");
            res.write("</div>");
            res.write("</body>");
            res.write("</html>");
            res.send();


        })
    })
})

<<<<<<< HEAD
app.listen(8080, function () {

    console.log("Server is running on port 8080.");
=======
app.listen(3000, function){

    console.log("Server is running on port 3000";
>>>>>>> f67293c30e9b01c5a2b6b7ab9354305afaae22a0
})


/* 
res.write("<h1>The temperature in " + query + " is " +  temp + " celsius</h1>");
        res.write("<p> The weather is currently " + temp1 +" clouds");
        res.write("<img src="  + imageURL +  "></img>");
        res.send();
*/

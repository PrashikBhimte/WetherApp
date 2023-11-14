import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com/";

const apiKey = "05d875e1e7a3913deeb31436dad4292f";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", async (req, res) => {
    res.render("index.ejs", { data : "Waiting for data" });
});

app.post("/search", async (req, res) => {
    const query = req.body.place;
    try {
        const result = await axios.get(API_URL + `current?access_key=${apiKey}&query=${query}`);
        res.render("index.ejs", { data : result.data.current });
    }
    catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
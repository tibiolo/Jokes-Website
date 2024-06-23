import express from "express";
import axios from "axios";
import BodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


// Setting App and PORT
const app = express();
const PORT = 3000;


// Using BodyParser
app.use(BodyParser.urlencoded({ extended: true }));


// Setting Public Directory
app.use(express.static("public"));

// Jokes API
const API_URL = "https://v2.jokeapi.dev/joke";

// Global Filter Variables
let filters;

// Homepage Route
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/Any", { params: { type: "twopart" }});
        res.render(__dirname + "/views/index.ejs", {
            jokeTitle: result.data.setup,
            joke: result.data.delivery
        });
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/next", async (req, res) => {
    if (filters && filters.length > 0) {
        try {
            const result = await axios.get(API_URL + `/${filters.category}`, { params: { type: "twopart", blacklistFlags: `${filters.blacklist.join()}`}});
    res.render(__dirname + "/views/index.ejs", {
        jokeTitle: result.data.setup,
        joke: result.data.delivery
    });
        } catch (error) {
            console.error(error.message);
        }
    } else {
        try {
            const result = await axios.get(API_URL + "/Any", { params: { type: "twopart" }});
            res.render(__dirname + "/views/index.ejs", {
                jokeTitle: result.data.setup,
                joke: result.data.delivery
            });
        } catch (error) {
            console.error(error.message);
        }
    }
});

// Filters Route
app.post("/filters", async (req, res) => {
    try {
        filters = req.body;
        const result = await axios.get(API_URL + `/${filters.category}`, { params: { type: "twopart", blacklistFlags: `${filters.blacklist.join()}`}});
        res.render(__dirname + "/views/index.ejs", {
            jokeTitle: result.data.setup,
            joke: result.data.delivery
        });
    } catch (error) {
        console.error(error.message);
    }
});


// Server Listening
app.listen(PORT, 
    console.log(`Server running on port: ${PORT}`)
);
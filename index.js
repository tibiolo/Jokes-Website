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
app.use(BodyParser.json());


// Setting Public Directory
app.use(express.static("public"));

// Jokes API
const API_URL = "https://v2.jokeapi.dev/joke";

// Homepage Route
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/Any", { params: { type: "twopart" }});
        res.render(__dirname + "/views/index.ejs", {
            jokeTitle: result.data.setup,
            joke: result.data.delivery
        });
    } catch (error) {
        console.error("Error while loading jokes", error.message);
        res.status(500).send("An error occurred while loading jokes. Please try again later.");
    }
})

// Filters Route
app.post("/next-joke", async (req, res) => {
    let filters = req.body;
    console.log("Received Filters", filters)
    try {
        const result = await axios.get(API_URL + `/${filters.category}`, { params: { type: "twopart", blacklistFlags: `${filters.blacklist}`}});
        res.json({
            jokeTitle: result.data.setup,
            joke: result.data.delivery
        })
    } catch (error) {
        console.error("Error while requesting next joke", error.message);
        res.status(500).json({ error: "An error occurred while requesting the next joke. Please try again later." });
    } 
})


// Server Listening
app.listen(PORT, 
    console.log(`Server running on port: ${PORT}`)
);
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
app.use(express.static(__dirname + "public"));




// Homepage Route
app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
})










// Server Listening
app.listen(PORT, 
    console.log(`Server runnin on port: ${PORT}`)
);
const express = require("express");
const app = express();
const PORT = 3000;

// Getting the DB:
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://sbokolia:gsip1m2aVxUQ068q@blogdb.9ultets.mongodb.net/?retryWrites=true&w=majority&appName=BlogDB"
    )
    .then(() => {
        console.log("DB connected!");
    });

const ArticlesDB = require("./models/article.model.js");

// initialize middleware:
// we had to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload.
app.use(express.json({ extended: false }));

// Add headers before the routes are defined
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});

app.post("/api/articles/", async (req, res) => {
    try {
        const article = await ArticlesDB.create(req.body);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/articles", async (req, res) => {
    try {
        const articles = await ArticlesDB.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/articles/:name/add-comments", async (req, res) => {
    try {
        const { username, text } = req.body;
        const articleName = req.params.name;
        let articleInfo = await ArticlesDB.find({ name: articleName });
        console.log(articleInfo);
        const article = await ArticlesDB.findOneAndUpdate(
            { name: articleName },
            {
                comments: articleInfo[0].comments.concat(req.body),
            }
        );
        articleInfo = await ArticlesDB.find({ name: articleName });
        res.status(200).send(articleInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/articles/:name", async (req, res) => {
    try {
        const articleName = req.params.name;
        const article = await ArticlesDB.find({ name: articleName });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

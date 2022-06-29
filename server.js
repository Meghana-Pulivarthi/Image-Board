const express = require("express");
const app = express();

const db = require("./db");

app.use(express.static("./public"));

app.use(express.json());

app.get("/images", (req, res) => {
    db.getImages()
        .then((result) => {
            console.log("/images route has been hit");
            console.log(result.rows, "result in rows");
            console.log(result, "result");
            const images = result.rows;
            res.json(images);
        })
        .catch((err) => {
            console.log("err in get images", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));

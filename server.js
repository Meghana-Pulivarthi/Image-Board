const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
app.use(express.static("./public"));
const path = require("path");
const s3 = require("./s3");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//creating storage configuration
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        //to do
        //create a random file
        //pick up the filename extension and save it too
        uidSafe(24).then((randomString) => {
            //keep the original file extension
            console.log("file", file);
            const extname = path.extname(file.originalname);
            console.log("extname", extname);
            callback(null, `${randomString}${extname}`);
        });
    },
});
const uploader = multer({ storage, limits: { fileSize: 2097152 } });

app.get("/images", (req, res) => {
    db.getImages()
        .then((result) => {
            console.log("/images route has been hit");
            // console.log(result.rows, "result in rows");
            const images = result.rows;
            res.json(images);
        })
        .catch((err) => {
            console.log("err in get images", err);
        });
});
app.get("/images/:imageid", (req, res) => {
    console.log("req.params.imageid", req.params.imageid);
    const imageid = req.params.imageid;
    db.highlightedImage(imageid)
        .then((result) => {
            console.log("In highligted", result.rows);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("error in highlighted image", err);
        });
});
// image in single must match with name=img in input field
app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    console.log("In upload");
    // console.log("req.image", req.image);
    const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
    console.log("req.body", req.body);
    console.log("req.body", req.body.title);
    console.log("req.body", req.body.user);
    console.log("https://s3.amazonaws.com/spicedling/" + req.file.filename);

    console.log("req.file", req.file);
    if (!req.body.title) {
        res.json({
            error: "Missing title field",
        });
        return;
    }
    if (!req.body.user) {
        res.json({
            error: "Missing user field",
        });
        return;
    }
    if (!req.body.image) {
        res.json({
            error: "Missing body field",
        });
        return;
    }

    db.addImages(url, req.body.title, req.body.user)
        .then((result) => {
            console.log("result.rows", result.rows);
            res.json({ data: result.rows[0] });
        })
        .catch((err) => {
            console.log("Error in add Images", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));

const spicedPg = require("spiced-pg");
const database = "imageboard";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.getImages = () => {
    return db.query(`SELECT * 
    FROM images 
    ORDER BY id 
    DESC LIMIT 3`);
};

module.exports.addImages = (url, username, title, description) => {
    // console.log("inside addImages", url, username, title, description);
    const q = `INSERT INTO images (url,username,title,description) 
    VALUES ($1,$2,$3,$4) 
    RETURNING *`;
    const param = [url, username, title, description];
    return db.query(q, param);
};

module.exports.highlightedImage = (imageid) => {
    console.log("imageid", imageid);
    return db.query(
        `SELECT * 
    FROM images
     WHERE id=$1`,
        [imageid]
    );
};

module.exports.getMoreImages = (id) => {
    return db.query(
        `SELECT url, title, id, (
        SELECT id FROM images
        ORDER BY id ASC
        LIMIT 1
        ) AS "lowestId"
        FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 3`,
        [id]
    );
};

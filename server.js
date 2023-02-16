const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


app.use(express.static("./webbsidan"));

app.use(bodyParser.urlencoded({extended: false}));

let comments = [
]


app.post("/comments", (req, res) =>{
    comments.push(req.body);

    io.emit("comment", req.body)
    res.sendStatus(200);
});


io.on("connection", (socket) => {
    console.log("En användare anslöt");
})

http.listen(3000, () =>{
    console.log("Vår server är igång, besök den på http://localhost:3000");
})


app.get("/comments", (req, res) => {
    res.send(comments);
});

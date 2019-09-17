const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const multer = require("multer");
const mongoose = require("mongoose");

const usersRoute = require("./server/route/users");
const imagesRoute = require("./server/route/images");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

mongoose.connect("mongodb://localhost/instalama", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploads"));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, "img-" + Date.now() + ".jpg");
	}
});
const upload = multer({ storage: storage });

app.post("/avatarImg", upload.single("file"), (req, res) => {
	if (req.file) {
		res.send(req.file);
	}
});

app.get("/users", usersRoute.getUsers);
app.get("/users/:id", usersRoute.getUser);
app.post("/users", usersRoute.addUser);
app.put("/users/:id", usersRoute.updateUser);

app.get("/userimages/:id", imagesRoute.getImages);
app.post("/userimages", upload.array("img"), imagesRoute.setImages);
app.get("/userimages", imagesRoute.getAllImages);


app.listen(port, () => { console.log("Server started on 3000 host") });

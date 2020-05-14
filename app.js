const bodyParser = require("body-parser");
const multer = require("multer");
const express = require("express");
const path = require("path");
const tasksRouter = require('./routes/index');

const app = express();

// EJS
app.set("view engine", "ejs");

// Set Storage Engine
var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//var upload = multer({ storage: storage })
const upload = multer({storage});

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname));

app.get("/", tasksRouter);
app.post("/", urlencodedParser, upload.single('file'), tasksRouter);

app.listen(3000);
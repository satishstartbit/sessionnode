const express = require("express");
const app = express()
const hostname = '127.0.0.1';
const port = process.env.PORT || 6005;
const multer = require('multer')   

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extends: true }))
app.set("view engine", "ejs")

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userproduct');

const routs = require("./controllers/404")
const router = require("./routes/routers")


const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const filefilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage: filestorage, fileFilter: filefilter }).single("image"))
// app.use(multer({ dest: 'uploads/' }).single("image"))




var nodemailer = require('nodemailer');

// https://ethereal.email/create            connect with ethereal 
async function email() {
    let transport = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'astrid.christiansen18@ethereal.email',
            pass: 'vBfJPm2d63GURcataa'
        }
    })


    let info = transport.sendMail({
        from: "<wilma.weimann@ethereal.email>",
        to: "leransb2023@gmail.com",
        subject: "hello satish",
        text: "hi",
        html: `<h2> hi sam </h2>`
    })

    console.log(info.massageId);
}
email()






app.use(session(
    {
        secret: "SECRET KEY",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            url: 'mongodb://127.0.0.1:27017/userproduct',
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native'
        })
    })
)
// app.use(csrftoken)


app.use("/", router.router)
app.use(routs.get404)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});




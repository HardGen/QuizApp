let express = require('express')
let app = express()

const things = require('./things')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const main = require('./routes/main')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session')

const upload = multer()

// for parsing application/xwww
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({secret: "kfrzdvrgn"}))

app.set('view engine', 'pug')
app.set('views', './views')

//for parsing pultipart/form-data
app.use(upload.array())
//static files
app.use(express.static('public'))


//middleware
// app.use(function(req, res, next) {
//     console.log("A new request received at " + Date.now())
//     next()
// })

//middleware function to logg request protocol
// app.use("/things", function(req, res, next) {
//     console.log("A request for things received at: " + Date.now())
//     next()
// })


app.get('/hello', function(req, res) {
    res.end('Hello World')
})

//render template
app.get('/first_template', function(req, res) {
    res.render('first_view', {
        name: "Tutorials Point",
        url: "http://tutorialpoints.com",
        user: {name: 'Vurgun', age: "20"}
    })
})


app.post('/', function(req, res) {
    console.log(req.body)
    res.send("receive your request!")
})

app.get("/form", function(req, res) {
    res.render('form')
})

app.use('/things', things)
app.use("/signup", signup)
app.use("/signin", signin)
app.use("/main", main)

app.listen(3000)
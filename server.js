const express = require("express");
//const mongoose
const mongoose = require("mongoose");
// const routes
const route = require("./routes/index.js");
//const cors
const cors = require("cors");
//const body-parse
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const optionCors = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(optionCors));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

const PORT = process.env.PORT

app.use(express.static('images'))
app.use('/images', express.static('images'))

app.use(bodyParser.urlencoded({extended: true}))
 
// connect ke database mongoDB
mongoose.connect("mongodb+srv://huda:hudamongoose@cluster0.hwpjb.mongodb.net/Product?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
// middleware 
app.use(cors());
app.use(express.json());

app.use('/product',route);
 
// listening to port
app.listen(PORT,() => console.log(`Server Running at port: ${PORT}`));
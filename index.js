require('dotenv').config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 3000


// Mongo
const mongoose = require("mongoose")
const password = process.env.PASSWORD
const userName = process.env.USERNAME
const db = process.env.DB
const uri = 'mongodb+srv://${userName}:${password}@cluster0.0u2ox.mongodb.net/${db}?retryWrites=true&w=majority'

mongoose
.connect(uri)
.then(() => console.log("connect to mango"))
.catch(err=> console.error(err))

const {Schema }= mongoose
const productSchema = new Schema({
    description: String,
    instock: Boolean,
    name: String,
    price: Number
})

const Product = mongoose.model("Product", productSchema)
console.log("Product", Product)

const product1 = new Product()
product1.save()



// Middleware 

app.use(cors())
app.use(bodyParser.json())


// Routes

app.post("/api/products",  (req, res) => {
    console.log("post api products")
    console.log(req.body)
    res.send({product: req.body})
}
)

app.get("/", (req, res) =>{
    console.log("get root")
    console.log(req.query)
    return res.send("hello world"+ req.query.name)
})


app.listen(port, () => {
    console.log("server listening on port" + port)
}
)
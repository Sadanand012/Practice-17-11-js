const express = require("express");
const mongoose = require("mongoose")
const Product = require("./models/productModel")

const app = express();
//midleware 
app.use(express.json())
//routes
app.get('/', (req, res) =>{
    res.send("Hello Node API")
})
app.get('/blog', (req, res) =>{
    res.send("Hello Blog YES..")
})
app.get('/products', async (req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.put('/products/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndUpdate(id, req.body);
        if(!products){
            res.status(404).json({message: 'can not find any product with id' + id});
        }
        res.status(200).json(products)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.delete('/products/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndDelete(id);
        if(!products){
            res.status(404).json({message: 'can not find any product with id' + id});
        }
        res.status(200).json(products)
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.post("/product", async (req, res) =>{
    // console.log("Product insert", req.body);
    try {
        const p1 = await Product.create(req.body);
        res.status(200).json({ data: p1})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message});
    }
})
mongoose.set("strictQuery", false);
mongoose
.connect("mongodb://localhost:27017/mongoDB_task3")
.then(() =>{
    console.log("Connected to mongo DB");
    app.listen(3000,() =>{
        console.log("Node API app is running  on port : 3000");
    })
}).catch((err) =>{
    console.log("connecting ", err);
})
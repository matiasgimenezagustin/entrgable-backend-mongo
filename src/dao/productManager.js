import mongoose from "mongoose";


const productoSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number
});

const Producto = mongoose.model('Producto', productoSchema);



export {Producto}
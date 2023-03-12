import express from "express"
import {manager} from "../productManager.js";
import { ErrorsManager } from "../errorManager.js";

const errorsManager = new ErrorsManager()

export const routerProducts = express.Router()
routerProducts.get("/", (req, res) => {
    const {limit} = req.query
    manager.getProducts(limit)
    .then(( data )=> res.status(200).json({status: 200, ok: true, data}) )
    .catch((err) => res.status(400).json({...errorsManager.createError(err), status: 400}))
})

routerProducts.get("/:pid", (req, res) =>{
    const {pid} = req.params
    if(pid && !isNaN(pid)){
        manager.getProductsById(pid).then(result => {
            if(result.ok){
                res.status(200).json({status: 200, ok: true, content: result.content})
            }else{
                res.status(404).json({...result, status: 404})
            }
        })
    }else if(isNaN(pid)){
        res.status(400).json({...errorsManager.createError("Product ID given was not a number"), status: 400})
    }else{
        res.status(401).json({...errorsManager.createError("Product ID was not specified"), status: 401})
    }
})

routerProducts.post("/", async (req, res) =>{
    const postedProduct = req.body
    if(Object.keys(postedProduct).length > 0){
        const response = await manager.addProduct(postedProduct)
        console.log(response)
        if(response.ok){
            res.status(200).json({ok: true, status: 200, content: response})
        }else{
            res.status(400).json({...response, status: 400})
        }
    }else{
        res.status(400).json({...errorsManager.createError("You was not send any product to post"), status: 400})
    }
})


routerProducts.delete("/:pid", async (req, res) =>{
    console.log("hola")
    const {pid} = req.params
    if(pid && !isNaN(pid)){
        const response = await manager.deleteById(pid)
        if(response.ok){
            res.status(200).json({ok: true, status: 200, content: response })
        }else{
            res.status(404).json({...response, status: 404})
        }
    }else if(isNaN(pid)){
        res.status(400).json({...errorsManager.createError("Product ID given was not a number"), status: 400})
    }else{
        res.status(400).json({...errorsManager.createError("Product ID was not specified")})
    }
})

routerProducts.put("/:pid", async (req, res) =>{
    const {pid} = req.params
    const productToUpdate = req.body
    if(pid && !isNaN(pid) && Object.keys(productToUpdate).length > 0){
        const response = await manager.updateProduct(pid, productToUpdate)
        if(response.ok){
            res.status(200).json({ok: true, status: 200, content: response })
        }else{
            res.status(404).json({...response, status: 404})
        }
    }else if(isNaN(pid)){
        res.status(400).json({...errorsManager.createError("Product ID given was not a number"), status: 400})
    }else if (Object.keys(productToUpdate).length === 0){
        res.status(400).json({...errorsManager.createError("Product to update was not defined"), status: 400})
    }else{
        res.status(400).json({...errorsManager.createError("Product ID was not specified"), status: 400})
    }
})
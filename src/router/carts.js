import express from "express"
import {cartsManager} from "../cartsManager.js"
import { ErrorsManager } from "../errorManager.js"
export const routerCarts = express.Router()

const errorsManager = new ErrorsManager()

routerCarts.get("/:cid", (req, res) => {
    const {cid} = req.params
    if(isNaN(cid)){
        res.status(400).json({...errorsManager.createError("The cart ID given was not a number"), status: 400})
    }else{
        const response = cartsManager.getCartById(Number(cid))
        if(response.ok){
            res.status(200).json({...response, status:200})
        }else{
            res.status(404).json({...response, status: 404})
        }
    }
    
})

routerCarts.post("/", async (req, res) =>{
    res.status(200).json({status: 200, ok: true, content: await cartsManager.createCart()})
})

routerCarts.post("/:cid/product/:pid", async (req, res) =>{
    const {cid, pid} = req.params
    const response = await cartsManager.addProductToCart(cid, pid)
    console.log(response)
    if(response.ok){
        res.status(200).json({...response, status: 200})
    }else{
        res.status(404).json({...response, status: 404})
    }
})
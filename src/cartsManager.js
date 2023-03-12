import { saveArchive, readArchive } from "./fileSystemManager.js"
import { ErrorsManager } from "./errorManager.js"
const errorManager = new ErrorsManager()
class CartsManager {
    static errors = {
        cartNotFound: errorManager.createError("Cart not found")
    }
    static counterCartPath = "./src/db/counterCart.json"
    constructor(path){
        this.path = path
        this.counter = 0
        this.carts = []
    }
    getCartById = (id) =>{
        const cart = this.carts.find(cart => cart.id === Number(id))
        if(cart){
            return {...cart, ok: true}
        }
        return CartsManager.errors.cartNotFound
    }
    createCart = async () => {
        this.carts = [...this.carts, {id: this.counter++, products: []}]
        await saveArchive(CartsManager.counterCartPath, {counterCart: this.counter})
        await saveArchive(this.path, this.carts)
        return this.carts
    }
    addProductToCart = async (cid, pid) =>{
        const index = this.carts.findIndex(cart => cart.id === Number(cid))
        if( index != -1 ){
            const currentCart = this.carts[index].products
            if(currentCart.some(product => product.id === Number(pid))){
                const productIndex = currentCart.findIndex(product => product.id === Number(pid))
                this.carts[index].products[productIndex].quantity++
            }else{
                this.carts[index].products = [...currentCart, {id: Number(pid), quantity: 1}]
            }
            await saveArchive(this.path, this.carts)
            return {ok: true, content: this.carts}
        }else{
            return CartsManager.errors.cartNotFound
        }
        
    }
    init = async () =>{
        this.counter = {...await readArchive(CartsManager.counterCartPath)}.counterCart
        const currentCart = await readArchive(this.path)
        if(Object.keys(currentCart).length > 0){
            currentCart.forEach(cart => this.carts.push(cart))
        }
    }
}

const cartsManager = new CartsManager("./src/db/carts.json")

cartsManager.init()

export {cartsManager}
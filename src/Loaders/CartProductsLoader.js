import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader =async() =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    //if cart is in database you have to use async
    const storeCart = getShoppingCart()
    const savedCart = [];

    for(const id in storeCart)
    {
        const addedProduct = products.find(pd => pd.id === id)
        if(addedProduct){
            const quantity = storeCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    //if you want to return two things
    //return [products,savedCart];
    // return {products, savedCart}  or return {products, cart: savedCart}

    return savedCart;
}

export default cartProductsLoader;
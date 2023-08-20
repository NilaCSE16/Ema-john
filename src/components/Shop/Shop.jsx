import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart, setCart] = useState([])
   
    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    const handleAddToCart = (product) =>{
         console.log(product.name)
        
        //existing cart er sathe product add
        // const newCart = [...cart, product];

        //if product doesn't exist in the cart, then set quantity =1
        //if exist update quantity by 1
        let newCart =[];
        const exist = cart.find(pd => pd.id === product.id);
        if(!exist){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exist.quantity = exist.quantity+1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product.id);
    }

    useEffect(() =>{
        const storedCart = getShoppingCart();

        const savedCart = [];
        //step-1 get id
        for(const id in storedCart)
        {
            //step-2 get tha product using id
            //console.log(id);
            const addedProduct = products.find(product => product.id === id);

            if(addedProduct){
                //step-3 get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step-4 add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        //step-5 set the cart
        setCart(savedCart);
    },[products])

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product.id}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)    
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
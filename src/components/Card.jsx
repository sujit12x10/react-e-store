import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addProduct, remodveProduct } from "../store/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export const Card = ({product}) => {

    const dispatch = useDispatch()
    const [cartBtn, setCartBtn] = useState(false)
    const notify = (product) => {
        toast.success(`Successfully added to the cart.`)
    }
    const cart = useSelector(state => state.cart)
    const itemInCart = cart.find(item => item.id === product.id)
    
    useEffect(() => {
        itemInCart ? setCartBtn(true) : setCartBtn(false)
    }, [cartBtn])

    return (     
        <div> 
            <ToastContainer autoClose={2000} position="bottom-left" type="error" theme="dark"/>
            <div className="w-72 border bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <NavLink to={`/product/${product.slug}`}>
                    <img src={product.image_url1} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                </NavLink>
                <div className="px-4 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">{product.category[0]}</span>
                    <p className="text-sm font-semibold text-black truncate block capitalize">{product.name}</p>
                    {/* <div className="flex items-center text-center">
                        <p className="text-sm mx-auto font-bold cursor-auto my-3">₹ {product.price}</p>
                    </div> */}

                    <div className="py-4">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">₹ {product.price}</span>

                        {
                            cartBtn ? <button
                                        onClick={() => {
                                            dispatch(remodveProduct({...product}))
                                            setCartBtn(false)
                                        }}
                                        className="bg-orange-400 hover:bg-blue-400 text-white font-semibold py-2 px-4 text-sm rounded">
                                        Remove
                                    </button> :
                                    <button
                                        onClick={() => {
                                            dispatch(addProduct({...product, quantity: 1}))
                                            setCartBtn(true)
                                        }}
                                        className="bg-[#333] hover:bg-blue-400 text-white font-semibold py-2 px-6 text-sm rounded">
                                        Add
                                    </button>

                            }
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}
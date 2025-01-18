import { useDispatch, useSelector } from "react-redux"
import { addProduct, getCartTotal } from "../store/cartSlice"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { GoTrash } from "react-icons/go";
import { remodveProduct } from "../store/cartSlice";

import { loadStripe } from "@stripe/stripe-js";


export const Cart = () => {
    const cartItems = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const cartTotal = useSelector(getCartTotal)
    const [quantity, setQuantity] = useState(1)
    const [coupon, setCoupon] = useState(null)
    const [appliedCoupon, setAppliedCoupon] = useState({
        name: null,
        value: null,
        discount: (0).toFixed(2)
    })

    const coupons = {
        "FLAT10": ["4FEx2vh8", 10],
        "VIP30": ["damw0TM5", 30],
        "BLACKFRIDAY": ["BEPDMxjn", 25]
    }

    const applyCoupon = (event) => {        
        event.preventDefault()
        const code = event.target.coupon.value
        
        if (coupons[code]){
            setCoupon(code)
            setAppliedCoupon({
                name: coupons[code][0],
                value: coupons[code][1],
                discount: (cartTotal * (coupons[code][1]/100)).toFixed(2)
            })
        } else {
            setCoupon("invalid")
            setAppliedCoupon((prevValue) => (
                {
                    ...prevValue,
                    discount: (0).toFixed(2)
                }
            ))
        }
    }

    // Payment Integration
    const makePayment = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
        const couponId = appliedCoupon.name ? appliedCoupon.name : null
        const body = {
            products: cartItems,
            email: "sujit@gmail.com",
            coupon: couponId
        }
        const headers = {
            "Content-Type": "application/json"
        }
        // const response = await fetch("http://localhost:7000/api/create-checkout-session", {
        const response = await fetch("https://stripe-payment-blake.vercel.app/api/create-checkout-session/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json()
      
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error){
            console.log("ERROR: ", result.error);
        }
    }

    return (
        cartItems.length === 0 ? 
        <div className="py-16 h-screen">
            <h2 className="text-center pt-10 text-xl font-bold">Your cart is currently empty.</h2>
            <div className="flex justify-center items-center flex-col py-40">
                <NavLink to="/products">
                    <button className="bg-black text-white px-8 py-2 font-bold rounded text-xl">Shop Now</button>
                </NavLink>
            </div>
        </div>  : (
        <div className="flex-1 max-w-6xl mx-auto p-6 py-16 grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-4 p-6">
                <h1 className="text-xl font-bold">Shopping Bag</h1>
                <p className="text-gray-500 mb-6">{cartItems.length} Items in your bag.</p>
                <table className="w-full shadow bg-white border-collapse rounded-lg">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left text-sm p-2 pl-4">Product</th>
                            <th className="text-left text-sm p-2 ">Price</th>
                            <th className="text-left text-sm p-2 ">Quantity</th>
                            <th className="text-left text-sm p-2 ">Total</th>
                            <th className="text-left text-sm p-2 pr-4">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="flex items-center space-x-4 p-4">
                                        <img className="w-16 h-16 rounded" src={item.image_url1} alt="" />
                                        <div className="">
                                            <NavLink to={`/product/${item.slug}`}>
                                                <p className="text-sm font-bold text-blue-600">{item.name}</p>
                                            </NavLink>
                                        </div>
                                    </td>
                                    <td className="px-2">₹{item.price}</td>
                                    <td className="px-2">
                                        <select onChange={(event) => dispatch(addProduct({...item, quantity: event.target.value}))}  className="bg-gray-100" name="" id="">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} selected={item.quantity == num} className="bg-gray-100" value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-2 font-bold text-orange-600">₹{item.price * item.quantity}</td>
                                    <td onClick={() => dispatch(remodveProduct(item))} className="px-2"><GoTrash /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <aside className="bg-white mx-4 p-6 rounded-lg shadow lg:col-span-2 mt-8">
                <h2 className="text-lg font-bold text-center mb-6">Calculated Shipping</h2>
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Coupon Code</h2>
                    <form onSubmit={applyCoupon} className="space-y-4">
                        <input name="coupon" type="text" placeholder="Coupon Code" className="w-full border rounded-lg px-4 py-2"/>
                        <button className="w-full bg-orange-400 hover:bg-orange-800 text-white py-2 rounded-lg">Apply</button>
                    </form>
                    {
                        coupon ? ( coupon === "invalid" ? <h1 className="my-4 text-red-700 font-bold bg-red-300 p-3 rounded-sm">Invalid Coupon</h1> : <h1 className="my-4 text-green-700 bg-green-200 p-3 rounded-sm font-bold"><span className="italic">{coupon}</span> applied successfully</h1>) : ""
                    }
                </div>
                <div>
                    <p className="text-gray-500 py-2">Cart Subtotal: <span className="float-right font-bold">₹{cartTotal.toFixed(2)}</span></p>
                    <p className="text-gray-500 py-2">Discount: <span className="float-right font-bold text-orange-500">-₹{appliedCoupon ? appliedCoupon.discount : "00.00"}</span></p>
                    <h3 className="text-xl font-bold">Total: <span className="float-right">₹{(cartTotal - appliedCoupon.discount).toFixed(2)}</span></h3>
                    <button onClick={makePayment} className="w-full bg-black text-white font-bold py-2 rounded-lg mt-4">Checkout</button>
                </div>
            </aside>
        </div>
        )
    )
}
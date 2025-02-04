import { useDispatch, useSelector } from "react-redux"
import { addProduct, getCartTotal } from "../store/cartSlice"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { GoTrash } from "react-icons/go";
import { remodveProduct } from "../store/cartSlice";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {

    const { userLoggedIn } = useAuth()
    const cartItems = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const cartTotal = useSelector(getCartTotal)
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

    return userLoggedIn ? (
        cartItems.length === 0 ? 
        <div className="py-16 h-screen">
            <h2 className="text-center pt-10 text-xl font-bold">Your cart is currently empty.</h2>
            <div className="flex justify-center items-center flex-col py-40">
                <NavLink to="/products">
                    <button className="bg-black text-white px-8 py-2 font-bold rounded text-base">Shop Now</button>
                </NavLink>
            </div>
        </div>  :
        (<section className="bg-white py-8 antialiased dark:bg-white md:py-24">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-bold sm:text-2xl">Shopping Cart</h2>
                <p className="text-gray-500 mb-6">{cartItems.length} Items in your bag.</p>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    {/* Cart Items */}
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {
                                cartItems.map(item => 
                                    <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm md:p-6">
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <a href="#" className="shrink-0 md:order-1">
                                                <img className="h-20 w-20" src={item.image_url1} alt="imac image" />
                                            </a>
                                            <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <div className="px-2">
                                                        <select onChange={(event) => dispatch(addProduct({...item, quantity: event.target.value}))}  className="bg-gray-100" name="" id="">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <option key={num} selected={item.quantity == num} className="bg-gray-100" value={num}>{num}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold">₹ {item.price * item.quantity}</p>
                                                </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <NavLink to={`/product/${item.slug}`} className="text-base font-medium">{item.name}</NavLink>
                                                <div className="flex items-center gap-4">
                                                <button type="button" className="inline-flex items-center text-sm font-medium bg-green-100 text-green-500 px-1 rounded">
                                                    ₹ {item.price}
                                                </button>
                                                <button type="button" className="inline-flex items-center text-sm font-medium">
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                    </svg>
                                                    Add to Favorites
                                                </button>

                                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                        onClick={() => dispatch(remodveProduct(item))}
                                                >
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                        <div className="hidden xl:mt-8 xl:block">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                        <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" className="overflow-hidden rounded">
                                    <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                    <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                </a>
                                <div>
                                    <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27”</a>
                                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    <span className="line-through"> $399,99 </span>
                                    </p>
                                    <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                </div>
                                <div className="mt-6 flex items-center gap-2.5">
                                    <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                    </svg>
                                    </button>
                                    <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                    Add to favourites
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                    <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                    </svg>
                                    Add to cart
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    
                    {/* Checkout Section */}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border p-6">
                            <p className="text-xl font-bold text-center">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-bold">Original price</dt>
                                    <dd className="text-base font-medium">₹ {cartTotal.toFixed(2)}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-green-600 italic">Savings</dt>
                                    <dd className="text-base font-medium text-green-600">₹{appliedCoupon ? appliedCoupon.discount : "00.00"}</dd>
                                </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
                                    <dt className="text-base font-bold">Total</dt>
                                    <dd className="text-base font-bold">₹ {(cartTotal - appliedCoupon.discount).toFixed(2)}</dd>
                                </dl>
                            </div>
                            <button onClick={makePayment}className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-[#333]">Checkout</button>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <a href="/products" title="" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline hover:no-underline dark:text-primary-500">
                                Continue Shopping
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                        {
                            coupon ? 
                                ( coupon === "invalid" ? 
                                <h1 className="my-4 text-center text-red-700 font-bold bg-orange-200 p-3 rounded-sm">Invalid Coupon</h1>
                                :<h1 className="my-4 text-green-700 bg-green-200 p-3 rounded-sm font-bold">
                                    <span className="italic">{coupon}</span> applied successfully
                                </h1>) 
                            : ""
                        }
                            <form onSubmit={applyCoupon} className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium"> Do you have a voucher or gift card? </label>
                                    <input name="coupon" type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm" placeholder="" required />
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium bg-[#333] text-white">Apply Code</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)

    ) : <Navigate to="/login" state={{ message: "You must login first!"}}/>
}
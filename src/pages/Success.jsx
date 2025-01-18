import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { emptyCart } from "../store/cartSlice"
import Stripe from "stripe"
import { useState } from "react"

export const Success = () => {
    const location = useLocation()
    const cartItems = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [customer, setCustomer] = useState(null)

    const getDate = (date) => new Date(date * 1000).toUTCString()
    const stripe = Stripe(import.meta.env.VITE_STRIPE_PRIVATE_KEY)
    console.log(import.meta.env.VITE_STRIPE_PRIVATE_KEY);
    

    const getSession = async () => {
        // const session = await stripe.checkout.sessions.retrieve(location.search)
        
        const session = await stripe.checkout.sessions.retrieve(location.search.split("=")[1])

        setCustomer({
            date: getDate(session.created),
            name: session.customer_details.name,
            email: session.customer_details.email,
            amount: session.amount_total
        })
    }

    getSession()
    
    

    if (location.search){
        dispatch(emptyCart())
    }
    
    return (
        <div className="">
            <h1 className="mt-56">Success</h1>
        </div>
    )
}
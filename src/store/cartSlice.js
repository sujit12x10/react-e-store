import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const item = action.payload
            let index
            state.cart.push[item]
            if (state.cart.length > 0){
                state.cart.map(cartItem => {
                    index = state.cart.map((cartItem) => cartItem.id).indexOf(item.id)
                })
                index !== -1 ? state.cart[index] = item : state.cart.push(item)
            } else {
                state.cart.push(item)
            }

            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        remodveProduct: (state, action) => {            
            state.cart = state.cart.filter((item) => item.id != action.payload.id)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },

        emptyCart: (state, action) => {
            localStorage.setItem("cart", [])
        }
    }
})

export const getCartTotal = (state) => state.cart.reduce((total, item) => total + item.quantity * item.price, 0)

// For Store to Register Our Reducers
export const cartReducer = cartSlice.reducer

export const {addProduct, remodveProduct, emptyCart} = cartSlice.actions
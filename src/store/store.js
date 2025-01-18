import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "./CartSlice"

export const store = configureStore({
    reducer: cartReducer
})

export default store
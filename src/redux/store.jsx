import { configureStore, createSlice } from "@reduxjs/toolkit";
import { configs } from "eslint-plugin-react-refresh";

const cartSlice = createSlice({
    name: "cart",
    initialState: { products: [], total: 0 },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.products.find(item => item.id === action.payload.id)
            if (existingProduct) {
                existingProduct.quantity += 1
                existingProduct.total = existingProduct.quantity * existingProduct.price
            } else {
                state.products.push({ ...action.payload, quantity: 1, total: action.payload.price })
            }
            state.total = state.products.reduce((total, item) => total + (item.quantity * item.price), 0)
        },
        removeForCart: (state, action) => {
            const index = state.products.findIndex((item) => item.id === action.payload)
            if (index !== -1) {
                state.total -= state.products[index].price
                state.products.splice(index, 1)
            }
        }
    }
})

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export const { addToCart, removeForCart } = cartSlice.actions
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { configs } from "eslint-plugin-react-refresh";
import { getAllSweet, getAllTopping } from "../fetch/detail";

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [], total: 0 },
  reducers: {
    addToCart: (state, action) => {
      const { id, topping, sweet, price } = action.payload;

      // const findTopping = getAllTopping().find(item => item.id === topping);
      const findTopping = getAllTopping().find((item) =>
        topping.includes(item.id)
      );
      const findSweet = getAllSweet().find((item) => item.id === sweet);

      const toppingPrice = findTopping ? findTopping.price : 0;
      const sweetName = findSweet?.name || "Default";
      const toppingName = findTopping?.name || "No Topping";
      // const toppingName = findTopping.length > 0 ? findTopping.map(item => item.name).join(", ") : "No Topping";

      const existingProduct = state.products.find(
        (item) =>
          item.id === id &&
          item.topping === toppingName &&
          item.sweet === sweetName
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total =
          existingProduct.quantity * (price + toppingPrice);
      } else {
        state.products.push({
          ...action.payload,
          sweet: sweetName,
          topping: [toppingName],
          quantity: 1,
          total: price + toppingPrice,
        });
      }

      state.total = state.products.reduce(
        (total, item) => total + item.total,
        0
      );
    },
    removeForCart: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.total -= state.products[index].price;
        state.products.splice(index, 1);
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const { addToCart, removeForCart } = cartSlice.actions;

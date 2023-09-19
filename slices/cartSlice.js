import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    removeFromCart: (state, action) => {
      // We have all the card items
      let newCart = [...state.items];
      // Find the index of the item that you want to remove
      let itemIndex = state.items.findIndex((item) => item._id == action.payload.id);
      // Remove and update the items
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("Can't remove an item that is not added to the cart.");
      }
      state.items = newCart;
    },

    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

// export const selectCartItemsById = (state, id) => state.cart.items.filter((item) => item.id == id);
// export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => (total = total + item.price), 0);

export const selectCartItemsById = createSelector([selectCartItems, (_, id) => id], (items, id) => items.filter((item) => item._id === id));

export const selectCartTotal = createSelector([selectCartItems], (items) => items.reduce((total, item) => total + item.price, 0));

export default cartSlice.reducer;

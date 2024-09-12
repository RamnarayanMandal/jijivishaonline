import { createSlice } from '@reduxjs/toolkit';

const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    data: [],
    totalQuantity: 0,
  },
  reducers: {
    addToBag: (state, action) => {
      const newProduct = action.payload.data;
      console.log("bagSlice",newProduct);
      const quantityToAdd = action.payload.quantity || 1; // Quantity to add, default is 1
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === newProduct._id
      );
    
      if (existingProductIndex !== -1) {
        // Product already exists, increase its quantity by the specified amount
        state.data[existingProductIndex].quantity += quantityToAdd;
      } else {
        // Product does not exist, add new entry with the specified quantity
        state.data.push({ ...newProduct, quantity: quantityToAdd });
      }
    
      // Update the total quantity in the bag
      state.totalQuantity += quantityToAdd;
    },
    

    removeFromBag: (state, action) => {
      const productIdToRemove = action.payload.productId;
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === productIdToRemove
      );

      if (existingProductIndex !== -1) {
        // Subtract the quantity of the product being removed from the total
        state.totalQuantity -= state.data[existingProductIndex].quantity;

        // Remove the product from the bag
        state.data.splice(existingProductIndex, 1);
      }
    },

    clearBag: (state) => {
      state.data = [];
      state.totalQuantity = 0;
    },

    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload._id;
      const quantityToIncrease = action.payload.quantity || 1; // Increase by a specific amount or default to 1
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === productIdToIncrease
      );

      if (existingProductIndex !== -1) {
        state.data[existingProductIndex].quantity += quantityToIncrease;
        state.totalQuantity += quantityToIncrease;
      }
    },

    decreaseQuantity: (state, action) => {
      const productIdToDecrease = action.payload._id;
      const quantityToDecrease = action.payload.quantity || 1; // Decrease by a specific amount or default to 1
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === productIdToDecrease
      );

      if (existingProductIndex !== -1) {
        if (state.data[existingProductIndex].quantity > quantityToDecrease) {
          state.data[existingProductIndex].quantity -= quantityToDecrease;
          state.totalQuantity -= quantityToDecrease;
        } else {
          // If the quantity to decrease is greater than or equal to the current quantity, remove the product
          state.totalQuantity -= state.data[existingProductIndex].quantity;
          state.data.splice(existingProductIndex, 1);
        }
      }
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;

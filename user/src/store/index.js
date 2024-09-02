import {configureStore} from '@reduxjs/toolkit'

import bagSlice from './bagSlice';
import productCatogrySlice from './productCatogrySlice';
import productSubcategorySlice from './productSubcategory';



const Jijivisha = configureStore({
    reducer: {
       
        bag: bagSlice.reducer,
        productCategory:productCatogrySlice.reducer,
        productSubcategory:productSubcategorySlice.reducer,


       
        
    }
})

export default Jijivisha;
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import basketSlice from "../features/basketSlice";
const store=configureStore({
    reducer:{
        userSlice:userSlice,
        basketSlice:basketSlice,
    }
});
export default store;
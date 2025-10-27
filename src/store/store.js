import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/store/features/userSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
});
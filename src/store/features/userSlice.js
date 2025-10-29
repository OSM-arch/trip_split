import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userData: null,
        address: null,
        car: null
    },
    reducers: {
        setUser: (state, action) => {state.user = action.payload},
        clearUser: (state) => {state.user = null;},
        setUserData: (state, action) => {state.userData = action.payload},
        setAddress: (state, action) => {state.address = action.payload},
        setCar: (state, action) => {state.car = action.payload}
    }
});


export const {
    setUser,
    clearUser,
    setUserData,
    setAddress,
    setCar
} = userSlice.actions;
export default userSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userData: null,
    address: null,
    car: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {state.user = action.payload},
        setUserData: (state, action) => {state.userData = action.payload},
        setAddress: (state, action) => {state.address = action.payload},
        setCar: (state, action) => {state.car = action.payload},
        clearAll: () => initialState
    }
});


export const {
    setUser,
    setUserData,
    setAddress,
    setCar,
    clearAll
} = userSlice.actions;
export default userSlice.reducer;
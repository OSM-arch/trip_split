import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userData: null
    },
    reducers: {
        setUser: (state, action) => {state.user = action.payload},
        clearUser: (state) => {state.user = null;},
        setUserData: (state, action) => {state.userData = action.payload}
    }
});


export const {
    setUser,
    clearUser,
    setUserData
} = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    load: false,
}

const LoadingSlice = createSlice({
    name: 'Loading',
    initialState,
    reducers: {
        Load: (state, action) => {
            console.log(action.payload)
            return {
                ...state,   
                load: action.payload
            }
        }
    },
})

export const { Load } = LoadingSlice.actions
export default LoadingSlice.reducer
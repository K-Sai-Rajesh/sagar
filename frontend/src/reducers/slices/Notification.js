import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    msg: '',
    notify: false,
}

const NotificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        Notify: (state, action) => {
            return {
                ...state,
                msg: action.payload?.msg,
                notify: true,
            }
        },
        NotifyOut: (state) => {
            return {
                ...state,
                msg: '',
                notify: false,
            }
        }
    }
})
export const { Notify, NotifyOut } = NotificationSlice.actions
export default NotificationSlice.reducer
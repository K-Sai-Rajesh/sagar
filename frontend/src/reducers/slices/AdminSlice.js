import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Notify } from "./Notification"
import axios from "axios"
import Cookies from "js-cookie"
import { Load } from "./Loader"

const initialState = {
    status: false,
    data: {},
    socket: null,
    events: [],
    length: 0
}

export const create_user = createAsyncThunk(
    'Admin/create_user',
    async ({ user }, { dispatch }) => {
        try {
            console.log(user)
            dispatch(Load(true))

            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/add_user"
            const response = await axios.post(url, {
                token: Cookies.get('token'),
                user
            })
            dispatch(Load(false))
            dispatch(Notify({ msg: response?.data ? response?.data : 'Operation held with some issue !' }))
            // navigate('/users')

        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)


export const get_events = createAsyncThunk(
    'Admin/get_events',
    async ({ data }, { dispatch }) => {
        try {
            dispatch(Load(true))
            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/get_events"
            const response = await axios.post(url, {
                skip: data?.skip,
                limit: data?.limit
            })
            dispatch(Load(false))
            // dispatch(Notify({ msg: response?.data ? response?.data : 'Operation held with some issue !' }))
            return response.data

        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
            return
        }
    }
)

export const upload_event = createAsyncThunk(
    'Admin/upload_event',
    async ({ events }, { dispatch }) => {
        try {
            console.log(events)
            dispatch(Load(true))

            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/add_event"
            const response = await axios.post(url, {
                token: Cookies.get('token'),
                events
            })
            dispatch(Load(false))
            dispatch(get_events({}, { dispatch }))
            dispatch(Notify({ msg: response?.data ? response?.data : 'Operation held with some issue !' }))
            return

        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
            return
        }
    }
)

const AdminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        Clear: () => {
            return {
                status: false,
                data: {},
                socket: null
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(create_user.pending, () => { })
            .addCase(create_user.fulfilled, (state) => {
                return {
                    ...state,
                }
            })
            .addCase(upload_event.pending, () => { })
            .addCase(upload_event.fulfilled, (state) => {
                return {
                    ...state,
                }
            })
            .addCase(get_events.pending, () => { })
            .addCase(get_events.fulfilled, (state, actions) => {
                return {
                    ...state,
                    events: actions.payload?.result,
                    length: actions.payload?.length
                }
            })
    }
})

export const { Clear } = AdminSlice.actions
export default AdminSlice.reducer
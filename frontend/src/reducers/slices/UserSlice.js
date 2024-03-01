import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Notify } from "./Notification"
// import axios from "axios"
// import Cookies from "js-cookie"
import { Load } from "./Loader"
import axios from "axios"
import Cookies from "js-cookie"
import { Get_Feed } from "./LoginSlice"

const initialState = {
    profiles: []
}
// https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/find_friends

export const response_to_request = createAsyncThunk(
    'User/response_to_request',
    async ({ data }, { dispatch }) => {
        try {
            // dispatch(Load(true))
            const { token, user_id, flag } = data
            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/accept_request"
            const response = await axios.post(url, {
                token,
                user_id,
                flag
            })
            dispatch(Get_Feed({ token }, { dispatch }))
            dispatch(Notify({ msg: response.data }))
            return {

            }
        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)

export const send_friend_request = createAsyncThunk(
    'User/send_friend_request',
    async ({ data, navigate }, { dispatch }) => {
        try {
            // dispatch(Load(true))
            const { token, user_id } = data
            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/add_friend"
            const response = await axios.post(url, {
                token,
                user_id
            })
            dispatch(Get_Feed({ token }, { dispatch }))
            dispatch(Notify({ msg: response.data }))
            return {

            }
        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)

export const get_users_profile = createAsyncThunk(
    'User/get_profiles',
    async ({ token, navigate }, { dispatch }) => {
        try {
            // dispatch(Load(true))
            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/find_friends"
            const response = await axios.post(url, {
                token
            })
            return {
                profiles: response.data
            }
        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)

export const upload_image = createAsyncThunk(
    'User/upload_image',
    async ({ upload, navigate }, { dispatch }) => {
        try {
            console.log(upload)
            dispatch(Load(true))
            console.log(upload)
            const token = Cookies.get('token')
            const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/feed"
            const response = await axios.post(url, {
                token,
                feed: upload
            })

            console.log(response.data)
            dispatch(Get_Feed({ token }, { dispatch }))
            dispatch(Notify({ msg: response.data }))
            return {}
        } catch (e) {
            console.error(e)
            dispatch(Notify({ msg: e.response.data.msg ? e.response.data.msg : 'Technical Error ! Please Try Again !' }))
            return {}
        }
    }
)

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(upload_image.pending, () => { })
        builder.addCase(upload_image.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        builder.addCase(get_users_profile.pending, () => { })
        builder.addCase(get_users_profile.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        builder.addCase(send_friend_request.pending, () => { })
        builder.addCase(send_friend_request.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        builder.addCase(response_to_request.pending, () => { })
        builder.addCase(response_to_request.fulfilled, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
    }
})

// export const { Clear } = UserSlice.actions
export default UserSlice.reducer
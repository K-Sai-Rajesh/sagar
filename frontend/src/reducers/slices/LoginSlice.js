import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Notify } from "./Notification"
import { Load } from "./Loader"
import { io } from 'socket.io-client'
import axios from "axios"
import Cookies from 'js-cookie'
import { get_users_profile } from "./UserSlice"
import { get_events } from "./AdminSlice"

const initialState = {
    status: false,
    profile: null,
    user_id: Cookies?.get('user_id') === undefined ? null : Cookies?.get('user_id'),
    feed: null,
    token: Cookies?.get('token') === undefined ? null : Cookies?.get('token'),
    privilege: Cookies?.get('privilege') === undefined ? null : Cookies?.get('privilege'),
    socket: null,
    online: false,
    acceptCookies: Cookies?.get('acceptCookies') === undefined ? false : Cookies?.get('acceptCookies')
}


export const Get_Feed = createAsyncThunk(
    "Login/get_feed",
    async ({ token, navigate }, { dispatch }) => {
        try {
            // const { token } = data
            var feed = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/get_feed'

            feed = await axios.post(feed, {
                token
            })
            if (feed.data === 'Please Login !') {
                dispatch(Logout())
            }

            feed = feed.data
            dispatch(Load(false))
            return {
                feed
            }

        } catch (e) {
            console.error(e)
            dispatch(Load(false))
            dispatch(Notify({ msg: 'Feed Failed !' }))
            return {}
        }
    }
)
export const Get_Profile = createAsyncThunk(
    "Login/get_profile",
    async ({ data, navigate }, { dispatch }) => {
        try {
            const { token, users, privilege } = data
            var get_profiles = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/get_profiles"
            var feed = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/get_feed'

            var profile = await axios.post(get_profiles, {
                token,
                users
            })
            feed = await axios.post(feed, {
                token
            })
            if (feed.data === 'Please Login !') dispatch(Logout())
            profile = profile.data[0]
            feed = feed.data
            dispatch(Load(false))
            if (profile) {
                var socket;

                socket = io("http://localhost:8081")
                socket.emit('login', { user_id: users[0], Name: `${profile.first_name} ${profile.last_name}` })
                privilege === 'admin' ? navigate('/admin') : navigate('/dashboard')
                dispatch(get_users_profile({ token }, { dispatch }))
                dispatch(get_events({}, { dispatch }))
                return {
                    socket,
                    profile,
                    feed
                }
            } else return {}

        } catch (e) {
            console.error(e)
            dispatch(Load(false))
            dispatch(Notify({ msg: 'Sign in without profile or feed !' }))
            return {}
        }
    }
)

export const Login = createAsyncThunk(
    'Login/user_login',
    async ({ data, navigate }, { dispatch }) => {
        try {
            dispatch(Load(true))
            console.log(data)
            var url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/login" //"http://localhost:8081/login"
            const response = await axios.post(url, data)
            dispatch(Load(false))

            if (Object.keys(response.data).includes('user_id', 'privilege', 'token')) {
                console.log(response.data)
                const { user_id, privilege, token } = response.data
                try {
                    const data = {
                        token,
                        users: [user_id],
                        privilege
                    }
                    Cookies.set('token', token)
                    Cookies.set('user_id', user_id)
                    Cookies.set('privilege', privilege)
                    dispatch(Get_Profile({ data, navigate }, { dispatch }))
                    dispatch(Notify({ msg: 'Sign in successfull !' }))
                    return {
                        online: true,
                        privilege,
                        token,
                    }
                } catch (e) {
                    console.log(e)
                    dispatch(Load(false))
                    dispatch(Notify({ msg: response?.data.error ? response?.data.error : 'Sign In Failed !' }))
                }
            } else {
                dispatch(Load(false))
                dispatch(Notify({ msg: response?.data.error ? response?.data.error : 'Sign In Failed !' }))
                return {}
            }

        } catch (e) {
            console.error(e)
            dispatch(Load(false))
            dispatch(Notify({ msg: e.response.data?.msg ? e.response.data?.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)

const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        Logout: () => {
            Cookies.remove('token')
            Cookies.remove('privilege')
            Cookies.remove('user_id')
            window.location.reload()
            return {
                status: false,
                profile: null,
                token: null,
                privilege: null,
                socket: null,
                online: false
            }
        },
        AcceptCookies: (state, actions) => {
            Cookies.set('acceptCookies', true)
            return {
                ...state,
                acceptCookies: actions.payload
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(Login.pending, () => { })
            .addCase(Login.fulfilled, (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(Get_Profile.pending, () => { })
            .addCase(Get_Profile.fulfilled, (state, actions) => {
                return {
                    ...state,
                    ...actions.payload
                }
            })
            .addCase(Get_Feed.pending, () => { })
            .addCase(Get_Feed.fulfilled, (state, actions) => {
                return {
                    ...state,
                    ...actions.payload
                }
            })

    }
})

export const { Logout, AcceptCookies } = LoginSlice.actions
export default LoginSlice.reducer
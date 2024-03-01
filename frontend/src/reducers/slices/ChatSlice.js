import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Load } from "./Loader"
import { Notify } from "./Notification"

const initialState = {
    Chats: [],
    reciever: null,
    online: []
}

export const New_Login = createAsyncThunk(
    'Login/new_login',
    async ({ friends }, { dispatch }) => {
        try {
            console.log('online', friends)
            const friendsList = await axios.post('http://localhost:8081/friendlist', { friends: friends?.friends })
            console.log("new Login =>", friendsList)
            return friendsList.data

        } catch (e) {
            console.error(e)
            dispatch(Load(false))
            dispatch(Notify({ msg: e.response.data?.msg ? e.response.data?.msg : 'Technical Error ! Please Try Again !' }))
        }
    }
)

const ChatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        ChatUpdate: (state, actions) => {
            var chat = state.reciever === actions.payload?.from ? { ...actions.payload, status: 'read' } : actions.payload
            return {
                ...state,
                Chats: [
                    ...state.Chats,
                    chat
                ]
            }
        },
        ChatsRead: (state, actions) => {
            return {
                ...state,
                Chats: actions.payload
            }
        },
        SetReciever: (state, action) => {
            return {
                ...state,
                reciever: action.payload
            }
        },
        Clear: () => {
            return {
                Chats: [],
                reciever: null,
                online: []
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(New_Login.pending, () => { })
        builder.addCase(New_Login.fulfilled, (state, action) => {
            return {
                ...state,
                online: action.payload
            }
        })
    }
})

export const { ChatUpdate, SetReciever, ChatsRead, Clear } = ChatSlice.actions
export default ChatSlice.reducer
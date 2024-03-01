import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import { ChatUpdate } from "../reducers/slices/ChatSlice";

export default function CurrentChat(props) {

    const { socket, reciever } = props
    const { Chats } = useSelector(state => state.ChatReducer)

    const [currentChat, setCurrentChat] = useState([])
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        var current = Chats?.filter((chat) => ((chat?.from === socket.id && chat?.to === reciever.id) || (chat?.to === socket.id && chat?.from === reciever.id)))
        setCurrentChat(current)
    }, [Chats, socket, reciever])

    useEffect(() => {
        const el = document.getElementById('chatbox')
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [currentChat])

    function send() {
        const message = {
            from: socket.id,
            to: reciever.id,
            message: text,
            status: 'unread',
            time: `on ${(new Date()).getDate()}.${(new Date()).getMonth()}.${(new Date()).getFullYear()} at ${(new Date()).getHours()}:${(new Date()).getMinutes()}`
        }

        dispatch(ChatUpdate({ ...message, status: 'read' }))

        setText('')
        const room = reciever.id
        socket.emit('to', message, room, (message) => {
            console.log(message)
        })
    }
    return (
        <>
            <List id='chatbox' sx={{ height: "305px", overflow: 'auto' }} >
                {
                    currentChat?.map((item, idx) => {
                        return (
                            <ListItem key={idx}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align={(item?.from === socket.id || item?.to === socket.id) ? "right" : "left"} secondary={item?.name} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align={item?.from === socket.id ? "right" : "left"} primary={item?.message} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align={item?.from === socket.id ? "right" : "left"} secondary={item?.time} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }} visibility={reciever?.id === undefined ? 'hidden' : 'none'}>
                <Grid item xs={10} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <TextField
                        id="outlined-basic-email"
                        label="Type Something"
                        value={text}
                        fullWidth
                        onChange={(e) => setText(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2} align="right" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Fab color="primary" size='medium' aria-label="add" onClick={() => send()}><SendIcon /></Fab>
                </Grid>
            </Grid>
        </>
    )
}
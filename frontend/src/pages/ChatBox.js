import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveFriend from './Chats';
import CurrentChat from './CurrentChat';
import AdjustIcon from '@mui/icons-material/Adjust';
import { ChatsRead, New_Login } from '../reducers/slices/ChatSlice';

const Chat = () => {

    const { socket, profile } = useSelector(state => state.LoginReducer)
    const { Chats, online } = useSelector(state => state.ChatReducer)
    const dispatch = useDispatch()
    const [reciever, setReciever] = useState(null)

    useEffect(() => {
        dispatch(New_Login({}, { dispatch }))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        var Online = []
        online.forEach(friend => {
            Online.push(friend.id)
        })
        if (!Online.includes(reciever?.id)) setReciever(null)
        // eslint-disable-next-line

    }, [online, reciever])

    useEffect(() => {
        try {
            var current = Chats?.map((chat) => {
                if ((chat?.from === socket.id && chat?.to === reciever.id)
                    || (chat?.to === socket.id && chat?.from === reciever.id))
                    return { ...chat, status: 'read' }
                else return chat
            })
            dispatch(ChatsRead(current))
        } catch (e) {
            console.error(e)
        }

        // eslint-disable-next-line
    }, [reciever])

    return (
        <div>
            <Grid container>
                <Grid p={2} item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} elevation={0}>
                <Grid item xs={12} md={4} lg={3}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src={profile?.pro_pic} />
                            </ListItemIcon>
                            <ListItemText primary={`${profile?.first_name} ${profile?.last_name}`} />
                            <Button color='success'>
                                <AdjustIcon color='success' />
                            </Button>
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        component={Paper}
                        sx={{ height: "400px", overflow: 'auto' }}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        {
                            online.length === 1 ?
                                <Typography textAlign={'center'}>No one is Online !</Typography>
                                :
                                // eslint-disable-next-line
                                online.map((friend, idx) => {
                                    if (friend.id !== socket.id)
                                        return (
                                            <>
                                                <ActiveFriend friend={friend} id={idx} setReciever={setReciever} reciever={reciever} socket={socket} />
                                            </>
                                        )
                                })
                        }
                    </List>
                </Grid>
                <Divider />
                <Grid item xs={12} md={8} lg={9} p={2} >
                    <Box
                        component={Paper} elevation={9}
                    >
                        <Box
                            p={2}
                        >
                            <Typography>{reciever?.Name}</Typography>
                        </Box>
                        {/* <Divider /> */}
                        {
                            reciever?.id === undefined ?
                                <Box
                                    sx={{ height: "430px" }}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Typography textAlign={'center'}>Please Select A friend to Chat !</Typography>
                                </Box>
                                :
                                <>
                                    <CurrentChat reciever={reciever} socket={socket} />
                                </>
                        }
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;
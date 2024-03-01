import { Avatar, Badge, Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetReciever } from '../reducers/slices/ChatSlice';
// import { ChatsRead } from '../reducers/slices/ChatSlice';
// import { useEffect, useState } from 'react';

const ActiveFriend = (props) => {
    const { friend, id, setReciever } = props
    const { Chats } = useSelector(state => state.ChatReducer)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        var count = 0
        Chats.forEach(chat => {
            if (chat?.from === friend?.id && chat?.status === 'unread') {
                console.log(chat)
                count++
            }
        })
        // var chats = Chats?.map(chat => {
        //     if (chat?.from === reciever.id) return { ...chat, status: 'read' }
        //     else return chat
        // })
        // dispatch(ChatsRead(chats))
        setCount(count)
    }, [Chats, friend])

    return (
        <ListItem key={id} sx={{ cursor: 'pointer' }} onClick={() => { setReciever(friend); dispatch(SetReciever(friend.id)) }}>
            <ListItemIcon>
                <Badge badgeContent={count} color="primary">
                    <Avatar alt={friend?.Name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                </Badge>
            </ListItemIcon>
            <ListItemText primary={friend.Name} />
            <Button color='success'>
                <AdjustIcon color='success' />
            </Button>
        </ListItem>
    );
}

export default ActiveFriend;
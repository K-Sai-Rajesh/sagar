import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
// import AddTaskIcon from '@mui/icons-material/AddTask';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { response_to_request, send_friend_request } from '../reducers/slices/UserSlice';
import ClearIcon from '@mui/icons-material/Clear';

export default function MediaControlCard(props) {
    const { request, friend, add, card } = props
    // const theme = useTheme();
    const dispatch = useDispatch()
    function AddFriend() {
        const data = {
            token: Cookies.get("token"),
            user_id: card.user_id
        }
        dispatch(send_friend_request({ data }, { dispatch }))
    }

    function Respond(flag) {
        const data = {
            token: Cookies.get("token"),
            user_id: card.user_id,
            flag
        }
        dispatch(response_to_request({ data }, { dispatch }))
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <Box width={'100%'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar
                        alt={card?.pro_pic}
                        src={card?.pro_pic}
                        sx={{ width: 56, height: 56 }}
                    />&ensp;
                    <Typography component="div" variant="p" fontSize={"12px"}>
                        {card?.first_name} {card?.last_name}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                    <Button>
                        {
                            add &&
                            <PersonAddAltIcon onClick={() => AddFriend()} />
                        }
                        {
                            friend &&
                            <DynamicFeedIcon />
                        }
                        {
                            request &&
                            <>
                                <AddTaskIcon onClick={() => Respond(true)} />&ensp;
                                <ClearIcon onClick={() => Respond(false)} />
                            </>
                        }
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}

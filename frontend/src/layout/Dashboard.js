import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import Slider from './drawer/Slide';
import TemporaryDrawer from './drawer/Swipe';
import { Avatar, Button, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Profile, Logout } from '../reducers/slices/LoginSlice';
import { ChatUpdate, New_Login } from '../reducers/slices/ChatSlice';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(false)
    const navigate = useNavigate()
    const {
        profile,
        feed,
        privilege,
        user_id,
        token,
        socket,
    } = useSelector(state => state.LoginReducer)

    const dispatch = useDispatch()

    const handleDrawerOpen = () => {
        window.innerWidth >= 768 ? setOpen(true) : setState(true);
    };

    React.useEffect(() => {
        try {
            if (profile === null) {
                console.log('profile', profile)
                const data = {
                    privilege, users: [user_id], token
                }
                dispatch(Get_Profile({ data, navigate }, { dispatch }))
            }
        } catch (e) {
            console.error(e)
        }
        // eslint-disable-next-line
    }, [profile])

    React.useEffect(() => {
        if (privilege === 'user') {
            socket?.on('recieve', (message) => {
                dispatch(ChatUpdate(message))
            })
            socket?.on('disconnect', () => {
                // eslint-disable-next-line
                signout()
            })
            socket?.on('new_login', (message) => {
                console.log('online', feed)
                dispatch(New_Login({ friends: feed }, { dispatch }))
            })
        }
        // eslint-disable-next-line
    }, [socket])

    const handleDrawerClose = () => {
        window.innerWidth >= 768 ? setOpen(false) : setState(false);
    };

    function signout() {
        socket.disconnect()
        navigate('/signin',{replace:true})
        dispatch(Logout())
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Grid
                            item
                            xs={4}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>

                        <Grid
                            item
                            xs={8}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRQU5ccjVg7_RMLAi--a_iZkZl4s6f1PYiA&usqp=CAU'}
                                />
                            </IconButton>
                            <Button color='inherit' size='small' onClick={() => signout()}>
                                {
                                    window.innerWidth > 767 ?
                                        'Logout'
                                        : <LogoutIcon />
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                window.innerWidth >= 768 ?
                    <Slider open={open} handleDrawerClose={handleDrawerClose} />
                    :
                    <TemporaryDrawer state={state} setState={setState} />
            }
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
                {/* <Footer /> */}
            </Box>
        </Box>
    );
}
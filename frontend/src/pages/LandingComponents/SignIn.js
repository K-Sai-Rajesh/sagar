import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../Footer';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../reducers/slices/LoginSlice';
import { Notify } from '../../reducers/slices/Notification';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        token,
        privilege,
    } = useSelector(state => state.LoginReducer)

    const handleSubmit = (event) => {
        event.preventDefault();
        const Data = new FormData(event.currentTarget);
        const data = {
            user_name: Data.get('user_name'),
            password: Data.get('password'),
        };
        if (data.user_name === '') { dispatch(Notify({ msg: 'User Name cannot be Empty !' })); return }
        if (data.password === '') { dispatch(Notify({ msg: 'Password cannot be Empty !' })); return }

        dispatch(Login({ data, navigate }, { dispatch }))
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {
                        token ?
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    privilege === 'admin' ? navigate('/admin') : navigate('/dashboard')
                                }}
                            >
                                {
                                    privilege === 'admin' ? 'Admin' : 'Dashboard'
                                }
                            </Button>
                            :
                            <>
                                <Fab
                                    size="medium"
                                    color="primary"
                                    variant="extended"
                                    sx={{
                                        alignSelf: 'end'
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    <ArrowBackIcon />
                                </Fab>
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="user_name"
                                        label="User Name"
                                        name="user_name"
                                        autoComplete="user_name"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </>
                    }
                </Box>
            </Container>
            <Footer fixed={true} />
        </ThemeProvider>
    );
}
import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { AppBar, Card, CardHeader, CardMedia, Container, CssBaseline, Fab, Grid, Toolbar, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import CookiesBanner from '../Cookies';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const cards = ["2/19/2024", '2/22/2024', "2/25/2024", "2/26/2024", "2/27/2024"];

export default function Events() {
    const [cookies, setCookies] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
        if (cookies) {
            console.log(cookies)
        }
    }, [cookies])

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" elevation={0} sx={{ backgroundColor: '#fff' }}>
                <Toolbar>
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Grid
                            item
                            xs={4}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <CameraIcon color='primary' />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={3}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'end'}
                        >
                            <Fab
                                size="medium"
                                color="primary"
                                variant="extended"
                                sx={{
                                    alignSelf: 'end'
                                }}
                                onClick={() => navigate(-1)}
                            >
                                <ArrowBackIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* Hero unit */}
                <div>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Events
                        </Typography>
                    </Container>
                </div>
                <Outlet />
            </main>
            <Footer fixed={false} />
            <CookiesBanner setCookies={setCookies} />
        </React.Fragment >
    );
}
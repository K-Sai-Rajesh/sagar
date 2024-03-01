import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { AppBar, Container, CssBaseline, Fab, Grid, Toolbar, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import CookiesBanner from '../Cookies';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventCard from './EventCard';
// import axios from 'axios';

const cards = ["2/19/2024", '2/22/2024', "2/25/2024", "2/26/2024", "2/27/2024"];

export default function Events() {
    const [cookies, setCookies] = useState(false)
    const navigate = useNavigate()
    const [upcoming, setUpcoming] = useState([])
    const [over, setOver] = useState([])

    useEffect(() => {
        if (cookies) {
            console.log(cookies)
        }
    }, [cookies])

    useEffect(() => {
        // uploadEvents()
        var upcoming = []
        var over = []
        cards.forEach(date => {
            const d1 = new Date()
            const d2 = new Date(date)
            console.log(typeof (Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24))))
            if (Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) >= 0) upcoming.push(date)
            else over.push(date)
        })
        console.log("up", upcoming)
        console.log("down", over)
        setUpcoming(upcoming)
        setOver(over)

    }, [])

    // async function uploadEvents() {
    //     try {
    //         // const res = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/upload_events', { name: 'Sai' })
    //         // console.log(res.data)
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

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
                                onClick={() => navigate('/')}
                            >
                                <ArrowBackIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Events
                        </Typography>
                    </Container>
                </div>
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    <div>
                        <Container maxWidth="lg">
                            <Typography component="h1" variant="h2" align="right" color="textPrimary" gutterBottom>
                                Upcoming
                            </Typography>
                        </Container>
                    </div>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {upcoming.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <EventCard card={card} status="to go" />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    <div>
                        <Container maxWidth="lg">
                            <Typography component="h1" variant="h2" align="right" color="textPrimary" gutterBottom>
                                Over
                            </Typography>
                        </Container>
                    </div>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {over.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <EventCard card={card} status="ago" />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer fixed={false} />
            <CookiesBanner setCookies={setCookies} />
        </React.Fragment>
    );
}
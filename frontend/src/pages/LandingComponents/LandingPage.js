import React from 'react';
import Footer from '../Footer';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Toolbar, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import CookiesBanner from '../Cookies';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import { useSelector } from 'react-redux';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LandingPage() {
    const { acceptCookies } = useSelector(state => state.LoginReducer)
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
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
                            <CameraIcon />
                            <Typography variant="h6" color="inherit" noWrap>
                                Album layout
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            lg={3}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'end'}
                        >
                            <Button color='inherit' onClick={() => navigate('/events')}>
                                <EventIcon />
                            </Button>
                            {
                                acceptCookies &&
                                <Grid
                                    item
                                    xs={4}
                                    display={'flex'}
                                    justifyContent={'end'}
                                    alignItems={'center'}
                                >
                                    <Button variant='outlined' color='inherit' onClick={() => navigate('/signin')} >
                                        SignIn
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => navigate('/subscription')} >
                                        Subscription
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer fixed={false} />
            <CookiesBanner />
        </React.Fragment>
    );
}
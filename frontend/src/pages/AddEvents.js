import { Box, Fab, Grid, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import statesData from '../state-and-districts.json'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

var states = {}

statesData.states.forEach(item => {
    states[item.state] = item.districts
})

export default function AddEvents() {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant="h6">
                    {
                        location.pathname === '/admin/events' ?
                            "Events"
                            :
                            "Add New Event"
                    }
                </Typography>
                {
                    location.pathname === '/admin/events' &&
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'end'}
                        alignItems={'center'}
                    >
                        <Fab
                            size="medium"
                            color="primary"
                            variant="extended"
                            sx={{
                                alignSelf: 'end'
                            }}
                            onClick={() => navigate('/admin/events/add')}
                        >

                            {
                                window.innerWidth < 768 ?
                                    <AddCircleOutlineIcon />
                                    :
                                    <>
                                        Add
                                    </>
                            }
                        </Fab>&ensp;
                        <Fab
                            size="medium"
                            color="primary"
                            variant="extended"
                            sx={{
                                alignSelf: 'end'
                            }}
                            onClick={() => navigate(-1)}
                        >
                            {
                                window.innerWidth < 768 ?
                                    <ArrowBackIcon />
                                    :
                                    'Back'
                            }
                        </Fab>
                    </Box>
                }
            </Grid>
            <Grid
                container
                spacing={3}
                maxWidth={'lg'}
            >
                <Outlet />
            </Grid>
        </React.Fragment>
    );
}
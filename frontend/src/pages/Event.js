import { Box, Fab, Grid, IconButton, ImageListItem, ImageListItemBar, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import statesData from '../state-and-districts.json'
import { FileUploader } from "react-drag-drop-files";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InfoIcon from '@mui/icons-material/Info';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { upload_event } from '../reducers/slices/AdminSlice';
// import { useSelector } from 'react-redux';

var states = {}

statesData.states.forEach(item => {
    states[item.state] = item.districts
})

export default function Event(props) {


    const fileTypes = ["JPEG", "PNG", "GIF"];
    // const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addUser, setAddUser] = useState({
        image: null,
        description: '',
        name: '',
        date: new Date()
    })

    function handleChange(event) {
        event.preventDefault()

        const { name, value } = event.target

        if (name === 'state') {
            setAddUser(prev => {
                return {
                    ...prev,
                    [name]: value,
                    district: states[value][0]
                }
            })
        } else {
            setAddUser(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const [file, setFile] = useState(null);

    const handleChangeImage = (file) => {
        setFile(file);
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            console.log('chats=>', baseString);
            setAddUser(prev => {
                return {
                    ...prev,
                    image: baseString
                }
            })
        };
        reader.readAsDataURL(file[0]);
        console.log('chats=>', file[0])
    };

    function Submit() {
        const events = {
            ...addUser
        }
        dispatch(upload_event({ events }, { dispatch }))
    }

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}
                display={'flex'}
                id='contain'
                justifyContent={'space-around'}
                alignItems={'center'}
            >
                <Grid container>
                    <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        {
                            addUser?.image === null ?
                                <Typography>
                                    Please Add Event Cover Image !
                                </Typography>
                                :
                                <ImageListItem key={addUser?.image} component={Paper} elevation={8}>
                                    <img
                                        src={addUser?.image}
                                        alt={file?.title}
                                        style={{
                                            width: '100%',
                                            height: "auto",
                                            borderTopRightRadius: 6,
                                            borderTopLeftRadius: 6,
                                        }}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={addUser?.name}
                                        subtitle={
                                            <p>
                                                on&nbsp;
                                                {format(addUser?.date, "eeee")}&nbsp;
                                                {(addUser?.date).getDate()}&nbsp;
                                                {format(addUser?.date, "LLLL")}&nbsp;
                                                {(addUser?.date).getFullYear()}&nbsp;
                                            </p>
                                        }
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${file?.name}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                        }
                    </Grid>
                    <Grid item xs={12} md={6} display={'flex'} p={2} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  >
                        <Box
                            width={'100%'}
                            py={1}
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
                                onClick={() => Submit()}
                            >

                                {
                                    window.innerWidth < 768 ?
                                        <EventAvailableIcon />
                                        :
                                        <>
                                            upload
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
                        <FileUploader
                            multiple={true}
                            handleChange={handleChangeImage}
                            name="file"
                            types={fileTypes}
                        /><br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Event Name"
                            name='name'
                            onChange={handleChange}
                            type='text'
                            fullWidth
                        /><br />
                        <TextField
                            id="outlined-multiline-static"
                            onChange={(e) => setAddUser(prev => { return { ...prev, date: new Date(e.target.value) } })}
                            type='date'
                            fullWidth
                        /><br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            onChange={handleChange}
                            name='description'
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
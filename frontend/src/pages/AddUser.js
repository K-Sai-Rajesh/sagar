import { Avatar, Box, Fab, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import statesData from '../state-and-districts.json'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CheckIcon from '@mui/icons-material/Check';
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from 'react-redux';
import { create_user } from '../reducers/slices/AdminSlice';
import { Notify } from '../reducers/slices/Notification';

var states = {}

statesData.states.forEach(item => {
    states[item.state] = item.districts
})

export default function AddUser() {

    const navigate = useNavigate()
    const { privilege, profile } = useSelector(state => state.LoginReducer)
    const dispatch = useDispatch()
    const fileTypes = ["JPEG", "PNG", "GIF"];
    const [addUser, setAddUser] = useState({
        first_name: privilege === 'user' ? profile?.first_name : null,
        last_name: privilege === 'user' ? profile?.last_name : null,
        phone_number: privilege === 'user' ? profile?.phone_number : null,
        password: privilege === 'user' ? profile?.password : null,
        address: privilege === 'user' ? profile?.address : null,
        state: privilege === 'user' ? profile?.state : Object.keys(states)[0],
        district: privilege === 'user' ? profile?.district : states["Andhra Pradesh"][0],
        city: privilege === 'user' ? profile?.city : null,
        zip: privilege === 'user' ? profile?.zip : null,
        country: privilege === 'user' ? profile?.country : null,
        pro_pic: privilege === 'user' ? profile?.pro_pic : null
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
                    pro_pic: baseString
                }
            })
        };
        reader.readAsDataURL(file[0]);
        console.log('chats=>', file[0])
    };

    function Submit() {
        var phonedef = new RegExp("(?:(?:\\+|0{0,2})91(\\s*[\\- ]\\s*)?|[0 ]?)?[789]\\d{9}|(\\d[ -]?){10}\\d", "g");

        if (addUser.phone_number === null || addUser.phone_number === "") {
            dispatch(Notify({ msg: "Phone Number is Required !" }))
            return
        }
        if (addUser.phone_number?.length !== 10 || !phonedef.test(addUser.phone_number)) {
            dispatch(Notify({ msg: "Illegal Number !" }))
            return
        }

        if (addUser.password === null || addUser.password === "") {
            dispatch(Notify({ msg: "Password is Required !" }))
            return
        }
        if (privilege === 'admin')
            dispatch(create_user({ user: addUser, navigate }, { dispatch }))

    }

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant="h6" gutterBottom>
                    {
                        privilege === 'admin' ? 'Add User' : "Edit"
                    }
                </Typography>
                <Box
                    display={'flex'}
                    alignItems={'center'}
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
                        {
                            window.innerWidth < 768 ?
                                <ArrowBackIcon />
                                :
                                'Back'
                        }
                    </Fab>&ensp;
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
                                // <ArrowBackIcon />
                                <>
                                    {
                                        privilege === 'admin' ? <PersonAddAltIcon /> : <CheckIcon />
                                    }
                                </>
                                :
                                <>
                                    {
                                        privilege === 'admin' ? 'Create User' : 'Update'
                                    }
                                </>
                        }
                    </Fab>
                </Box>
            </Grid>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Box>
                        <Avatar
                            component={Paper}
                            elevation={9}
                            src={addUser.pro_pic}
                            sx={{
                                width: 100,
                                height: 100
                            }}
                        />
                    </Box>&emsp;&emsp;
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <FileUploader
                            multiple={true}
                            handleChange={handleChangeImage}
                            name="file"

                            types={fileTypes}
                        />
                        <Typography>
                            {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First name"
                        value={addUser.first_name}
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="last_name"
                        name="last_name"
                        value={addUser.last_name}
                        onChange={handleChange}
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="contact phone number"
                        label="Contact phone number"
                        type="number"
                        value={addUser.phone_number}
                        name='phone_number'
                        fullWidth
                        disabled={privilege === "admin" ? false : true}
                        sx={
                            {
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                                {
                                    display: 'none',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }
                        }
                        onChange={handleChange}
                        placeholder="Contact phone number"
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        value={addUser.password}
                        fullWidth
                        onChange={handleChange}
                        autoComplete="password"
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        value={addUser.address}
                        label="Address line"
                        onChange={handleChange}
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addUser.state}
                            name='state'
                            label="State"
                            onChange={handleChange}
                        >
                            {
                                Object.keys(states)?.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addUser.district}
                            label="District"
                            name='district'
                            onChange={handleChange}
                        >
                            {
                                states[addUser.state]?.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        value={addUser.city}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        value={addUser.zip}
                        label="Zip / Postal code"
                        fullWidth
                        type='number'
                        sx={
                            {
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                                {
                                    display: 'none',
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }
                        }
                        onChange={handleChange}
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        disabled={privilege === 'admin' ? false : true}
                        value={addUser.country}
                        id="country"
                        name="country"
                        label="Country"
                        onChange={handleChange}
                        fullWidth
                        autoComplete="shipping country"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
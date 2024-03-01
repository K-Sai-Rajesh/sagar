import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';

export default function DialogBox(props) {

    const { open, setOpen } = props
    const [recharge, setRecharge] = React.useState({
        limit: 0,
        validity: 0,
        subscription: 'silver',
        status: false
    })
    // const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        console.log('chats=>', recharge)
    }, [recharge])

    function handleChange(e) {
        e?.preventDefault()
        const { name, value } = e.target
        setRecharge(prev => {
            return {
                ...prev,
                [name]: name === 'status' ? !recharge.status : value
            }
        })
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
            >
                <DialogTitle>Recharge</DialogTitle>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <React.Fragment>
                            <Grid container spacing={3} py={3}>
                                <Grid item xs={12} sm={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <TextField
                                        required
                                        id="limit"
                                        label="Upload Limit"
                                        type="number"
                                        name='limit'
                                        onChange={handleChange}
                                        fullWidth
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
                                        placeholder="Upload Limit"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <TextField
                                        required
                                        id="validity"
                                        label="Validity"
                                        type="number"
                                        name='validity'
                                        onChange={handleChange}
                                        fullWidth
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
                                        placeholder="Validity"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <FormControlLabel control={<Switch checked={recharge.status} onChange={handleChange} name='status' />} label="Active" />
                                </Grid>
                                <Grid item xs={12} sm={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <TextField
                                        required
                                        id="subscription"
                                        name="subscription"
                                        onChange={handleChange}
                                        label="Subscription"
                                        fullWidth
                                        autoComplete="premium"
                                        placeholder='premium'
                                    />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Fab
                        size="medium"
                        color="primary"
                        variant="extended"
                        sx={{
                            alignSelf: 'end'
                        }}
                        // onClick={() => navigate(-1)}
                        onClick={handleClose}
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
                    // onClick={() => navigate(-1)}
                    >
                        Update
                    </Fab>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
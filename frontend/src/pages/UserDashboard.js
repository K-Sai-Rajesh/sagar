import { Avatar, Box, Card, CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadFeed from "./UploadFeed";
import { useState } from "react";

export default function UserDashboard() {

    const [open, setOpen] = useState(false)
    const {
        profile,
        feed
    } = useSelector(state => state.LoginReducer)

    console.log('online', feed)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid
                container
                maxWidth={'md'}
                alignSelf={'start'}
            >
                <Grid
                    item
                    xs={12}
                    lg={6}
                >
                    <Card sx={{ display: 'flex' }} elevation={0}>
                        <Box width={'100%'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar
                                    component={Paper}
                                    elevation={5}
                                    alt="Remy Sharp"
                                    src={profile?.pro_pic}
                                    sx={{ width: 100, height: 100 }}
                                />&ensp;
                                <Typography>
                                    {profile?.first_name}
                                </Typography>
                            </CardContent>
                            <Box
                                display={'flex'}
                                width={'50%'}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Diversity3Icon
                                        // color="#4990E7"
                                        sx={{ width: 45, height: 45, color: '#707070' }}
                                    />
                                    &ensp;
                                    <Typography fontSize={30}>
                                        {feed?.friends?.length}
                                    </Typography>
                                </CardContent>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // mt: 1
                                    }}
                                >
                                    <DynamicFeedIcon
                                        // color="secondary"
                                        sx={{ width: 45, height: 45, color: '#B8D8FF' }}
                                    />
                                    &ensp;
                                    <Typography fontSize={30}>
                                        {
                                            feed?.images?.length
                                        }
                                    </Typography>
                                </CardContent>
                                {
                                    feed?.images?.length !== 0 &&
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mt: 4
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => setOpen(true)}
                                        >
                                            <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                                        </IconButton>
                                    </CardContent>
                                }
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                {/* <Grid
                    item
                    xs={12}
                    lg={6}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >

                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                    </IconButton>
                </Grid> */}
            </Grid>
            <hr style={{ backgroundColor: 'red', width: '100%' }} />
            <Grid
                container
                maxWidth={'md'}
                justifyContent={'center'}
                height={window.innerHeight / 2}
                overflow={'auto'}
            >
                {
                    feed?.images?.length === 0 ?
                        <>
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Typography>
                                    Upload Images
                                </Typography>
                                <IconButton
                                    onClick={() => setOpen(true)}
                                >
                                    <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                                </IconButton>
                            </Grid>
                        </>
                        :
                        feed?.images?.map((d, idx) => (
                            <Grid
                                item
                                key={idx}
                                xs={12}
                                sm={4}
                                borderRadius={1}
                                p={2}
                            >
                                <img
                                    src={d?.image}
                                    width={'100%'}
                                    alt="item"
                                    style={{
                                        borderRadius: '5px'
                                    }}
                                />
                            </Grid>
                        ))}
            </Grid>
            <UploadFeed open={open} setOpen={setOpen} />
        </div>
    )
}
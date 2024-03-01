import * as React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptCookies } from '../reducers/slices/LoginSlice';

export default function CookiesBanner() {
    const { acceptCookies } = useSelector(state => state.LoginReducer)
    const dispatch = useDispatch()
    const closeBanner = (cookies) => {
        dispatch(AcceptCookies(cookies))
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <TrapFocus open disableAutoFocus disableEnforceFocus>
                <Fade appear={false} in={!acceptCookies}>
                    <Paper
                        role="dialog"
                        aria-modal="false"
                        aria-label="Cookie banner"
                        square
                        variant="outlined"
                        tabIndex={-1}
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            m: 0,
                            p: 2,
                            borderWidth: 0,
                            borderTopWidth: 1,
                        }}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    flexShrink: 1,
                                    alignSelf: { xs: 'flex-start', sm: 'center' },
                                }}
                            >
                                <Typography fontWeight="bold">This website uses cookies</Typography>
                                <Typography variant="body2">
                                    example.com relies on cookies to improve your experience.
                                </Typography>
                            </Box>
                            <Stack
                                gap={2}
                                direction={{
                                    xs: 'row-reverse',
                                    sm: 'row',
                                }}
                                sx={{
                                    flexShrink: 0,
                                    alignSelf: { xs: 'flex-end', sm: 'center' },
                                }}
                            >
                                <Button size="small" onClick={() => closeBanner(true)} variant="contained">
                                    Allow all
                                </Button>
                                <Button size="small" onClick={() => closeBanner(false)}>
                                    Reject all
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Fade>
            </TrapFocus>
        </React.Fragment>
    );
}
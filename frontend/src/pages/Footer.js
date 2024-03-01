import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Copyright from './Copyright';

export default function Footer(props) {
    const { fixed } = props
    return (
        <Box
            sx={{
                marginTop: '60px',
                width: '100%',
                position: fixed ? 'fixed' : 'relative',
                bottom: 0,
            }}
        >
            <CssBaseline />
            <Copyright />
        </Box>
    );
}
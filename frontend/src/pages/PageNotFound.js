import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
// import logo from '../images/logo512.png'
// ----------------------------------------------------------------------

export default function PageNotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Container>
                {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        height={50}
                        src={logo}
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}
                        alt='logo'
                    />
                </Box> */}
                <Box
                    sx={{
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }} fontFamily={'Dosis'} fontWeight={600}>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }} fontFamily={'Dosis'} fontWeight={600}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.
                    </Typography>

                    <Box
                        component="img"
                        src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_404.svg"
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button onClick={() => navigate(-1)} size="large" variant="contained" >
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </>
    );
}
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Fab, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../Footer';

const tiers = [
    {
        title: 'General',
        price: '49',
        description: [
            '20 Image Uploads',
            'Help center access',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
    {
        title: 'Premium',
        subheader: 'Most popular',
        price: '99',
        description: [
            '100 Image Uploads',
            'Help center access',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    }
    //   {
    //     title: 'Enterprise',
    //     price: '299',
    //     description: [
    //       'Unlimited Cards Development',
    //       'Unlimited Downloads',
    //       'Help center access',
    //       'Phone & email support',
    //     ],
    //     buttonText: 'Contact us',
    //     buttonVariant: 'outlined',
    //   },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
    const navigate = useNavigate()
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 2, pb: 2 }}>
                <Box
                    display={'flex'}
                    flexDirection={'column-reverse'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
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
                </Box>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Join our family
                    &nbsp;
                    <span
                        style={{
                            color: '#5FE0E5',
                        }}
                    >
                        tapwave
                    </span> &nbsp;
                    .
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="lg" component="Paper" sx={{ pb: 6 }}>
                <Grid container spacing={5} justifyContent={'center'} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card
                                component={Paper}
                                elevation={5}
                            >
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Premium' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        fontFamily: 'Questrial !important',
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" fontFamily={'Exo 2 !important'} color="text.primary">
                                            <CurrencyRupeeIcon />
                                            {tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /month
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                fontFamily={'Questrial'}
                                                fontWeight={600}
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        // onClick={() => navigate('/signup')}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Footer fixed={true} />
            {/* End footer */}
        </ThemeProvider>
    );
}
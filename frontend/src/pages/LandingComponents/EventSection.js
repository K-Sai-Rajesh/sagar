import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import closed from '../../images/closed.jpg'
import coming from '../../images/comingsoon.jpg'

export default function EventSections() {

    const navigate = useNavigate()

    return (
        <>
            <Grid container maxWidth="md" justifyContent={'space-between'} sx={{ py: 2 }}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={5}
                    p={1}
                >
                    <Card sx={{ cursor: 'pointer', p: 2 }} elevation={7} onClick={() => navigate('/events/list')}>
                        <CardHeader
                            title="Upcoming"
                        />
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="300"
                            image={coming}
                        ></CardMedia>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={5}
                    p={1}
                >
                    <Card sx={{ cursor: 'pointer', p: 2 }} elevation={7}>
                        <CardHeader
                            title="Completed"
                        />
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="300"
                            image={closed}
                        ></CardMedia>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
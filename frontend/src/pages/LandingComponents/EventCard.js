import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from "date-fns";
import { CardActions } from '@mui/material';

export default function EventCard(props) {
    const { card, status } = props

    return (
        <Card sx={{ maxWidth: 345, cursor: 'pointer' }} elevation={5}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader={
                    `on ${format(new Date(card), "EEEE")},
                        ${(new Date(card)).getDate()} ${format(new Date(), "MMMM")}
                        `}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://source.unsplash.com/random"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton aria-label="share">
                    {
                        `
                        ${Math.ceil((Math.abs((new Date(card)) - (new Date()))) / (1000 * 60 * 60 * 24))
                        } ${status}
                        `
                    }
                </IconButton>
            </CardActions>
        </Card>
    );
}

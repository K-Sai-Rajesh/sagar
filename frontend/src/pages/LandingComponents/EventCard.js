import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { format } from "date-fns";
import { Box, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EventCard(props) {
    const { card, status } = props
    console.log(card)
    return (
        <Card sx={{ maxWidth: 345, cursor: 'pointer' }} elevation={5}>
            <CardHeader
                avatar={
                    <Avatar component={Paper} elevation={9} aria-label="recipe">
                        {card.name[0]}
                    </Avatar>
                }
                action={
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItem='center'
                    >
                        <IconButton
                            size='medium'
                        >
                            <DeleteIcon color='error' fontSize='small' />
                        </IconButton>
                    </Box>
                }
                title={card.name}
                subheader={
                    `on ${format(new Date(card.date), "EEEE")},
                    ${(new Date(card.date)).getDate()} ${format(new Date(), "MMMM")}
                    `}
            />
            <CardMedia
                component="img"
                height="194"
                image={card.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography
                    fontSize={15}
                    sx={{
                        float: 'inline-end'
                    }}
                >
                    {
                        Math.ceil((Math.abs((new Date(card.date)) - (new Date()))) / (1000 * 60 * 60 * 24))
                    }&nbsp;
                    days
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {
                        card?.description.substring(0, 20)
                    }...
                </Typography>
            </CardContent>
        </Card>
    );
}

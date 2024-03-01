import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { format } from 'date-fns'
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from 'react-redux';
import { upload_image } from '../reducers/slices/UserSlice';

export default function UploadFeed(props) {
    const { open, setOpen } = props;

    const [image, setImage] = React.useState({
        image: null,
        date: null
    })
    const dispatch = useDispatch()
    const fileTypes = ["JPEG", "PNG", "GIF"];
    const [file, setFile] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeImage = (file) => {
        setFile(file);
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            setImage(prev => {
                return {
                    ...prev,
                    image: baseString,
                    date: new Date()
                }
            })
        };
        reader.readAsDataURL(file[0]);
    };

    function Upload() {
        try{
            const upload = image
            dispatch(upload_image({upload},{dispatch}))
            setOpen(false)
            setImage({
                image: null,
                date: null
            })
            setFile(null)
        }catch(e){
            console.error(e)
        }
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Upload Image</DialogTitle>
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

                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ width: '100%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {
                                        image?.image !== null &&
                                        <ImageListItem key={image?.image} sx={{ width: '100%' }}>
                                            <img
                                                src={image?.image}
                                                alt={file?.title}
                                                style={{
                                                    width: '100%',
                                                    height: "auto",
                                                    borderTopRightRadius: 6,
                                                    borderTopLeftRadius: 6,
                                                }}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={image?.name}
                                                subtitle={
                                                    <p>
                                                        on&nbsp;
                                                        {format(image?.date, "eeee")}&nbsp;
                                                        {image?.date.getDate()}&nbsp;
                                                        {format(image?.date, "LLLL")}&nbsp;
                                                        {image?.date.getFullYear()}&nbsp;
                                                    </p>
                                                }
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${file?.name}`}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}  >

                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'space-between'}
                                >
                                    <FileUploader
                                        multiple={true}
                                        handleChange={handleChangeImage}
                                        name="file"

                                        types={fileTypes}
                                    /><br />
                                    <Typography>
                                        {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => Upload()}>Upload</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

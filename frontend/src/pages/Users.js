import { Fab, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import UsersTable from "./Tables";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DialogBox from "./DialogBox";

export default function Users() {

    const [name, searchName] = useState('')
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    return (
        <>
            <Grid
                container
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <TextField
                        label="TextField"
                        size="small"
                        onChange={(e) => searchName(e.target.value)}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <Fab
                        size="medium"
                        color="primary"
                        variant="extended"
                        onClick={() => navigate('/admin/add_user')}
                    >
                        {
                            window.innerWidth < 768 ?
                                // <ArrowBackIcon />
                                <PersonAddAltIcon />
                                :
                                'Add User'
                        }
                    </Fab>
                </Grid>
                <Grid
                    item
                    xs={12}
                    py={2}
                    overflow={'scroll'}
                >
                    <UsersTable name={name} setOpen={setOpen} />
                </Grid>
            </Grid>
            <DialogBox open={open} setOpen={setOpen} />
        </>
    )
}
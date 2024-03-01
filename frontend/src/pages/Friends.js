import { Grid, Typography } from "@mui/material";
import MediaControlCard from "./FriendCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Friends(props) {
    const { request, friend, add } = props
    const { profiles } = useSelector(state => state.UserReducer)
    const { feed } = useSelector(state => state.LoginReducer)
    const [List, setList] = useState([])

    useEffect(() => {
        if (add) setList(profiles)
        else {
            if (request) {
                console.log(feed?.friend_requests, profiles)
                const list = profiles?.filter(item => feed?.friend_requests.includes(item?.user_id))
                setList(list)
            }
            else {
                const list = profiles?.filter(item => feed?.friends.includes(item?.user_id))
                setList(list)
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid
                container
            >
                {
                    List?.length === 0 ?
                        <>

                            <Grid
                                item
                                xs={12}
                            >
                                <Typography>
                                    {
                                        add ? "No Profiles to Show !" :
                                            request ? "No Friend Request !" :
                                                "Add Friends !"
                                    }
                                </Typography>
                            </Grid>
                        </>
                        :
                        List?.map((item, idx) => {
                            return (
                                <Grid
                                    key={idx}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    p={1}
                                >
                                    <MediaControlCard card={item} request={request} friend={friend} add={add} />
                                </Grid>
                            )
                        })
                }
            </Grid>
        </>
    )
}
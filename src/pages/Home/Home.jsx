import { Box } from "@mui/material"
import Campaign from "../../components/Campaign/Campaign"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCampaigns } from "../../redux/slices/campaigns";
import { Link, Navigate } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";
import styles from './Home.module.css'
import { selectIsAuth } from "../../redux/slices/auth";

export default function Home() {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch();
    const { campaigns } = useSelector((state) => state.campaigns);
    const isCampLoading = campaigns.status === 'loading';
    React.useEffect(() => {
        dispatch(fetchCampaigns())
    }, [])
    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <h1 className={styles.title}>Ваши кампании</h1>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {(isCampLoading ? [...Array(5)] : campaigns.items).map((obj, index) =>
                    isCampLoading ? (<Campaign key={index} isLoading={true} />) : (
                        <Campaign
                            key={index}
                            id={obj._id}
                            title={obj.title}
                            description={obj.description}
                            socials={obj.socials}
                        />
                    )
                )}
                <Link className={styles.add} to="/new-campaign"><AddOutlined /></Link>
            </Box>
        </>
    )
}
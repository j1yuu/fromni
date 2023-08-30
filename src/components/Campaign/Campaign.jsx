import { Box, Typography } from "@mui/material";
import styles from "./Campaign.module.css"
import CampaignSkeleton from "./Skeleton";
import { Link } from "react-router-dom";
export default function Campaign(props) {
    if (props.isLoading) {
        return (
            <CampaignSkeleton />
        )
    }
    return (
        <>
            <Box className={styles.campaign}>
                <div className={styles.left}>
                    <div className={styles.upper}>
                        <Typography className={styles.title} variant="h5">{props.title}</Typography>
                        <div className={styles.icons}>
                            {props.socials.map((ic, i) =>
                                <img className={styles.icon} key={i} src={`/img/${ic}.svg`} />
                            )}
                        </div>
                    </div>
                    <Typography className={styles.description} variant="p">{props.description}</Typography>
                </div>
                <div className={styles.right}>
                    <Link className={styles.edit} to={`/campaigns/${props.id}`}><img src="/img/edit.svg" alt="" /></Link>
                    <button className={styles.delete}><img src="/img/delete.svg" alt="" /></button>
                </div>
            </Box>
        </>
    )
}
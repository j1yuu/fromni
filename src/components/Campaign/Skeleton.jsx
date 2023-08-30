import { Box, Skeleton, Typography } from "@mui/material";
import styles from './Campaign.module.css'
import { Link } from "react-router-dom";

export default function CampaignSkeleton() {
    return (
        <>
            <Box className={styles.skeletonCampaign}>
                <div className={styles.left}>
                    <div className={styles.upper}>
                        <Skeleton variant="text" className={styles.skeletonTitle}></Skeleton>
                        <div className={styles.icons}>
                            <Skeleton className={styles.icon} variant="circular" />
                            <Skeleton className={styles.icon} variant="circular" />
                            <Skeleton className={styles.icon} variant="circular" />
                            <Skeleton className={styles.icon} variant="circular" />
                        </div>
                    </div>
                    <Skeleton className={styles.description} variant="text"></Skeleton>
                </div>
                <div className={styles.right}>
                    <Skeleton variant="circular" className={styles.skeletonEdit}></Skeleton>
                    <Skeleton variant="circular" className={styles.skeletonDelete}></Skeleton>
                </div>
            </Box>
        </>
    )
}
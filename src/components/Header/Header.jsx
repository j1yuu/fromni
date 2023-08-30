import { Avatar, Box, Button, Container } from '@mui/material'
import styles from './Header.module.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, logout, selectIsAuth } from '../../redux/slices/auth'

const imgSrc = 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?size=626&ext=jpg&ga=GA1.1.68910854.1693243399&semt=ais'

export default function Header() {
    const UserData = useSelector((state) => state.auth.data)
    const [menuState, setMenuState] = React.useState(false);
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    const handleMenuChange = () => {
        setMenuState(!menuState);
        console.log(menuState);
    }
    const onClickLogout = () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            dispatch(logout());
            window.localStorage.removeItem('token')
            navigate('/login');
        }
    };

    if (isAuth) {
        return (
            <>
                <header className={styles.header}>
                    <Container maxWidth="lg">
                        <Box sx={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/"><img className={styles.logo} src="/img/logo.svg" alt="Fromni" /></Link>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/new-campaign" className={styles.link}>Новая кампания</Link>
                                <Link to="/" className={styles.link}>Все кампании</Link>
                                <button onClick={handleMenuChange} className={styles.me}></button>
                            </Box>
                        </Box>
                    </Container>
                </header>
                <div className={menuState ? styles.open : styles.closed}>
                    <div className={styles.menu}>
                        <p className={styles.menu__me}>{UserData?.fullName}</p>
                        <button onClick={onClickLogout} className={styles.menu__logout}>Выйти</button>
                    </div>
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <header className={styles.header}>
                    <Container maxWidth="lg">
                        <Box sx={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/"><img className={styles.logo} src="/img/logo.svg" alt="Fromni" /></Link>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/login" className={styles.link}>Войти</Link>
                                <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                                <button onClick={handleMenuChange} className={styles.anon}>?</button>
                            </Box>
                        </Box>
                    </Container>
                </header>
                <div className={menuState ? styles.open : styles.closed}>
                    <div className={styles.menu}>
                        <p className={styles.menu__me}>Аноним</p>
                        <Link to="/login" className={styles.menu__logout}>Войти</Link>
                    </div>
                </div>
            </>
        )
    }
}
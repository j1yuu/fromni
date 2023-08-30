import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.css";
import { East } from "@mui/icons-material";

export default function Login() {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            alert('Не удалось авторизоваться.');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper className={styles.form}>
            <Typography className={styles.title} variant="h5">
                Вход в аккаунт
            </Typography>
            <form className={styles.fields} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Укажите почту' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    type="password"
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Укажите пароль' })}
                />
                <Button className={styles.button} disabled={!isValid} type="submit" size="large" fullWidth>
                    Войти
                </Button>
                <p className={styles.acc}>
                    Нет аккаунта?
                </p>
                <Link to='/register' className={styles.link}><span>Создайте новый</span><East /></Link>
            </form>
        </Paper>
    );
};

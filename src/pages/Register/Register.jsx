import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { East } from "@mui/icons-material";

export default function Register() {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            passwordHash: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            alert('Не удалось зарегистрироваться.');
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
                Создание аккаунта
            </Typography>
            <form className={styles.fields} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="fullName"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Укажите ваше имя' })}
                    className={styles.field}
                    label="Полное имя"
                    fullWidth
                />
                <TextField
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Укажите почту' })}
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                />
                <TextField
                    type="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('passwordHash', { required: 'Укажите пароль' })}
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                />
                <Button className={styles.button} disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
            <p className={styles.acc}>
                Уже есть аккаунт?
            </p>
            <Link to='/login' className={styles.link}><span>Войдите в систему</span><East /></Link>
        </Paper>
    );
};

import React from "react";

import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, fetchUserAuth } from '../../store/slices/auth-slice'

import { useForm } from 'react-hook-form'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";


export const Login = () => {

	const dispatch = useDispatch()
	const isUserValide = useSelector(authSelector)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		mode: "onSubmit"
	})

	const submitHandler = async (params) => {
		const user = await dispatch(fetchUserAuth(params))

		if (!user.payload) {
			return alert('Вы не авторизованы')
		}

		if ('token' in user.payload) {
			window.localStorage.setItem('token', user.payload.token)
		}

	}

	if (isUserValide) {
		return <Navigate to="/" />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(submitHandler)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					fullWidth
					type="email"
					helperText={errors.email?.message}
					{...register('email', { required: 'Укажите почту' })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					fullWidth
					error={Boolean(errors.password?.message)}
					type="password"
					helperText={errors.password?.message}
					{...register('password', { required: 'Укажите пароль' })}

				/>

				<Button type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};

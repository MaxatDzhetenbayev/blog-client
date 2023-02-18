import React from 'react';

import { useDispatch } from 'react-redux'
import { fetchUserRegister } from '../../store/slices/auth-slice'
import { useForm } from 'react-hook-form'

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

export const Registration = () => {

	const dispatch = useDispatch()

	const {
		handleSubmit,
		formState: { errors, isValid },
		register
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: ''
		},
		mode: "onChange"
	})

	const submitHandler = async (params) => {
		const user = await dispatch(fetchUserRegister(params))

		if (!user.payload) {
			return
		}

		if ('token' in user.payload) {
			window.localStorage.setItem('token', user.payload.token)
		}
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(submitHandler)}>
				<TextField
					className={styles.field}
					label="Полное имя"
					type="text"
					fullWidth
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register("fullName", { required: "Укажите ваше полнове имя" })}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					type="email"
					fullWidth
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "Укажите вашу почту" })}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					type="password"
					fullWidth
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Укажите ваш пароль" })}
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import axios from '../../axios'

import { authDataSelector } from '../../store/slices/auth-slice';

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {

	const { id } = useParams()
	const { data } = useSelector(authDataSelector)
	const [text, setText] = useState('')

	const createCommentHandler = async () => {
		await axios.post(`/comment/${id}`, { text })
		setText('')
	}

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={`http://localhost:4000${data.avatarUrl}`}
				/>
				<div className={styles.form}>
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						value={text}
						onChange={(event) => setText(event.target.value)}
					/>
					<Button onClick={createCommentHandler} variant="contained">Отправить</Button>
				</div>
			</div>
		</>
	);
};

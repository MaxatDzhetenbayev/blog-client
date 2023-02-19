import { useState, useCallback, useMemo, useRef } from 'react';
import axios from '../../axios'


import { useSelector } from 'react-redux'
import { authSelector } from '../../store/slices/auth-slice'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { stringtoArray } from '../../utils/stringToArray'

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {

	const isAuth = useSelector(authSelector)
	const navigate = useNavigate()


	const imageRef = useRef(null)
	const [image, setImage] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [text, setText] = useState('');



	const onChange = useCallback((value) => {
		setText(value);
	}, []);

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);


	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/uploads', formData)
			setImage(data.message)

		} catch (err) {
			console.warn(err)
			alert('Ошибка при загрузке файла')
		}
	};

	const onClickRemoveImage = () => { };

	const onSubmit = async () => {
		const field = {
			title,
			tags: stringtoArray(tags),
			text,
			image
		}

		const {data} = await axios.post('posts', field)

		const postId = data._id

		navigate(`/posts/${postId}`)
	}


	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to="/" />
	}

	return (
		<Paper style={{ padding: 30 }}>

			<Button onClick={() => imageRef.current.click()} variant="outlined" size="large">
				Загрузить превью
			</Button>

			<input type="file" ref={imageRef} onChange={handleChangeFile} hidden />

			{image && (
				<>
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Удалить
					</Button>
					<img className={styles.image} src={`http://localhost:4000${image}`} alt="Uploaded" />
				</>
			)}

			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Заголовок статьи..."
				fullWidth

				type='text'
				value={title}
				onChange={event => setTitle(event.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Тэги"
				fullWidth

				type='text'
				value={tags}
				onChange={event => setTags(event.target.value)}
			/>

			<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					Опубликовать
				</Button>
				<a href="/">
					<Button size="large">Отмена</Button>
				</a>
			</div>

		</Paper>
	);
};

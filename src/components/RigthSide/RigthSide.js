import React from 'react'

import { useSelector } from 'react-redux'
import { tagsFilteredSelector } from '../../store/slices/tag-slice'

import { Grid } from '@mui/material'
import { CommentsBlock } from '../CommentsBlock'
import { TagsBlock } from '../TagsBlock'


export const RigthSide = () => {

	const tags = useSelector(tagsFilteredSelector)

	return (
		<Grid xs={4} item>

			<TagsBlock items={tags} isLoading={false} />

			<CommentsBlock
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			/>

		</Grid>

	)
}

import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { tagsFilteredSelector } from '../../store/slices/tag-slice'
import axios from '../../axios'

import { Grid } from '@mui/material'
import { CommentsBlock } from '../CommentsBlock'
import { TagsBlock } from '../TagsBlock'


export const RigthSide = () => {

	const tags = useSelector(tagsFilteredSelector)

	return (
		<Grid xs={4} item>

			<TagsBlock items={tags} isLoading={false} />



		</Grid>

	)
}

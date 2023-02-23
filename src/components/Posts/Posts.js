import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularPosts, fetchNewPosts, postsSelector } from '../../store/slices/post-slice'

import { Post } from '../Post'

import { Box, Grid, Typography } from '@mui/material'


export const Posts = ({ tabIndex }) => {

	const dispatch = useDispatch()
	const { data, status } = useSelector(postsSelector)
	const auth = useSelector((state) => state.AuthSlice)

	const isPostsLoading = status === 'loading'

	const { tag } = useParams()

	useEffect(() => {
		if (tabIndex === 0) {
			dispatch(fetchNewPosts(tag))
		}
		if (tabIndex === 1) {
			dispatch(fetchPopularPosts(tag))

		}
	}, [tabIndex, tag])


	return (
		<Grid xs={8} item>
			<TabPanel value={tabIndex} index={0} >
				{!isPostsLoading && data.map((post) => (
					(isPostsLoading
						?
						<Post isLoading={true} key={post._id} />
						:
						<Post
							key={post._id}
							_id={post._id}
							title={post.title}
							imageUrl={post.image && 'http://localhost:4000' + post.image}
							user={{ ...post.user }}
							createdAt={post.createdAt}
							viewsCount={post.viewsCount}
							commentsCount={post.comments.length}
							tags={post.tags}
							isEditable={auth?.data?._id === post.user._id}
						/>)
				))}
			</TabPanel>
			<TabPanel value={tabIndex} index={1}>
				{!isPostsLoading && data.map((post) => (
					(isPostsLoading
						?
						<Post isLoading={true} key={post._id} />
						:
						<Post
							key={post._id}
							_id={post._id}
							title={post.title}
							imageUrl={post.image && 'http://localhost:4000' + post.image}
							user={{ ...post.user }}
							createdAt={post.createdAt}
							viewsCount={post.viewsCount}
							commentsCount={3}
							tags={post.tags}
							isEditable={auth?.data?._id === post.user._id}
						/>)
				))}
			</TabPanel>

		</Grid>
	)
}



const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
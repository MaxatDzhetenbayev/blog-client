import React, { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux'

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { fetchPost, fetchTags } from '../store/slices'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


export const Home = () => {

	const dispatch = useDispatch()
	const { data, status } = useSelector((state) => state.PostSice)
	const auth = useSelector((state) => state.AuthSlice)
	const tags = useSelector((state) => state.TagSlice)
	const isPostsLoading = status === 'loading'

	useEffect(() => {
		dispatch(fetchPost())
		dispatch(fetchTags())
	}, [])

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>

				<Grid xs={8} item>
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
				</Grid>

				<Grid xs={4} item>

					<TagsBlock items={tags.data} isLoading={false} />

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
			</Grid>
		</>
	);
};

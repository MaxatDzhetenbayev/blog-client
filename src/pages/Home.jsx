import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux'

import { fetchPost, fetchTags } from '../store/slices'
import { tagsFilteredSelector } from '../store/slices/tag-slice';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import { Posts } from '../components/Posts/Posts';




export const Home = () => {


	const tags = useSelector(tagsFilteredSelector)

	const [tabIndex, setTabIndex] = useState(0)

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const handleChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
				<Tab label="Новые" {...a11yProps(0)} />
				<Tab label="Популярные" {...a11yProps(0)} />
			</Tabs>

			<Grid container spacing={4}>

				<Posts tabIndex={tabIndex} />

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
			</Grid>
		</>
	);
};



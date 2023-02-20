import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import {changeTab} from '../store/slices/post-slice'
import { fetchTags } from '../store/slices/tag-slice'

import { Posts } from '../components/Posts/Posts';
import { RigthSide } from '../components/RigthSide/RigthSide';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


export const Home = () => {

	const dispatch = useDispatch()


	const tabIndex = useSelector(state => state.PostSlice.tab)


	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const handleChange = (event, newValue) => {
		dispatch(changeTab(newValue));
	};


	useEffect(() => {
		dispatch(fetchTags())
	}, [])





	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
				<Tab label="Новые" {...a11yProps(0)} />
				<Tab label="Популярные" {...a11yProps(0)} />
			</Tabs>

			<Grid container spacing={4}>
				<Posts tabIndex={tabIndex} />
				<RigthSide />
			</Grid>
		</>
	);
};



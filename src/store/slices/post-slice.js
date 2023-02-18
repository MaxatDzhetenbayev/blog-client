import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios'

export const fetchPost = createAsyncThunk(
	'post/fetchPost',
	async () => {
		const { data } = await axios.get('/posts')
		return data
	}
)


const initialState = {
	data: [],
	status: 'loading',
	error: null
}


const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPost.pending]: (state, action) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchPost.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'fullfield'
		},
		[fetchPost.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		}
	}
})


export const PostSice = postSlice.reducer
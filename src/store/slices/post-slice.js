import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios'

export const fetchPost = createAsyncThunk(
	'post/fetchPost',
	async () => {
		const { data } = await axios.get('/posts')
		return data
	}
)

export const fetchNewPosts = createAsyncThunk(
	'post/fetchNewPosts',
	async () => {
		const { data } = await axios.get('/posts/sort/news')
		return data
	}
)

export const fetchPopularPosts = createAsyncThunk(
	'post/fetchNewPosts',
	async () => {
		const { data } = await axios.get('/posts/sort/popular')
		return data
	}
)

export const fetchRemovePost = createAsyncThunk(
	'post/fetchRemovePost',
	async (id) => {
		await axios.delete(`/posts/${id}`)
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
		},


		[fetchNewPosts.pending]: (state, action) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchNewPosts.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'fullfield'
		},
		[fetchNewPosts.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		},


		[fetchPopularPosts.pending]: (state, action) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchPopularPosts.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'fullfield'
		},
		[fetchPopularPosts.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		},


		[fetchRemovePost.pending]: (state, action) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchRemovePost.fulfilled]: (state, action) => {
			state.data = state.data.filter((post) => post._id === action.payload)
			state.status = 'fullfield'
		},
		[fetchRemovePost.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		},

	}
})


export const PostSlice = postSlice.reducer

export const postsSelector = state => state.PostSlice
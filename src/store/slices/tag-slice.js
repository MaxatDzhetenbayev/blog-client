import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios'

const initialState = {
	data: [],
	status: 'loading',
	error: null
}


export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
	const { data } = await axios.get('/tags')

	return data
})



const tagSlice = createSlice({
	name: 'post-reduser',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTags.pending]: (state, action) => {
			state.status = 'loading'
			state.error = null

		},
		[fetchTags.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'fullfield'
		},
		[fetchTags.rejected]: (state, action) => {
			state.error = action.payload
			state.status = 'rejected'
		},

	}
})

export const TagSlice = tagSlice.reducer

export const tagsFilteredSelector = (state) => {
	return state.TagSlice.data.reduce((acc, item) => {
		if (acc.includes(item)) {
			return acc
		}
		return [...acc, item]
	}, [])
} 
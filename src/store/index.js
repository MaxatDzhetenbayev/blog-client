import { configureStore } from '@reduxjs/toolkit'

import { PostSlice, TagSlice, AuthSlice } from './slices'


export const store = configureStore({
	reducer: {
		PostSlice,
		TagSlice,
		AuthSlice
	},
	devTools: true
})
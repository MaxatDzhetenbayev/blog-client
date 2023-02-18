import { configureStore } from '@reduxjs/toolkit'

import { PostSice, TagSlice, AuthSlice } from './slices'


export const store = configureStore({
	reducer: {
		PostSice,
		TagSlice,
		AuthSlice
	},
	devTools: true
})
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'


export const fetchUserAuth = createAsyncThunk(
	"auth/fetchUserAuth",
	async (params) => {

		const { data} = await axios.post('/auth/login', params, {
			validateStatus: function (status) {
				return status <= 300
			}
		})
		return data
	}
)

export const fetchUserRegister = createAsyncThunk(
	"auth/fetchUserRegister",
	async (params) => {

		const { data } = await axios.post('auth/register', params, {
			validateStatus: function (status) {
				return status <= 300
			}
		})
		return data
	}
)

export const fetchUserLogin = createAsyncThunk(
	"auth/fetchUserLogin",
	async () => {
		const { data } = await axios.get('auth/me')
		return data
	}
)


const initialState = {
	data: null,
	error: null,
	status: "idle"
}


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
			state.error = null
			state.status = "idle"
		}
	},
	extraReducers: {
		[fetchUserAuth.pending]: (state, action) => {
			state.status = "pending"
			state.error = null

		},
		[fetchUserAuth.fulfilled]: (state, action) => {
			state.status = "fullfield"
			state.data = action.payload
		},
		[fetchUserAuth.rejected]: (state, action) => {
			state.status = "rejected"
			state.error = action.payload
		},

		[fetchUserLogin.pending]: (state, action) => {
			state.status = "pending"
			state.error = null
		},
		[fetchUserLogin.fulfilled]: (state, action) => {
			state.status = "fullfield"
			state.data = action.payload
		},

		[fetchUserLogin.rejected]: (state, action) => {
			state.status = "rejected"
			state.error = action.payload
		},

		[fetchUserRegister.pending]: (state, action) => {
			state.status = "pending"
			state.error = null
		},
		[fetchUserRegister.fulfilled]: (state, action) => {
			state.status = "fullfield"
			state.data = action.payload
		},
		[fetchUserRegister.rejected]: (state, action) => {
			state.status = "rejected"
		}
	}
})

export const authDataSelector = (state) => state.AuthSlice
export const authSelector = (state) => Boolean(state.AuthSlice.data)

export const AuthSlice = authSlice.reducer
export const { logout } = authSlice.actions
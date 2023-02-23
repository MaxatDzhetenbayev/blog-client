import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { fetchUserLogin } from './store/slices/auth-slice'

import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUserLogin())
	}, [dispatch])


	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/tags/:tag' element={<Home />} />
					<Route path='/posts/:id' element={<FullPost />} />
					<Route path='/posts/:id/edit' element={<AddPost />} />
					<Route path='/posts/create' element={<AddPost />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;

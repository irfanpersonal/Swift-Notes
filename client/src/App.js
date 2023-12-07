import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddNote, Auth, Error, Home, HomeLayout, Landing, Note, Notes, Profile, ProtectedRoute} from './pages';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showCurrentUser} from './features/user/userThunk';

import store from './store.js';
import {loader as noteLoader} from './pages/Note.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'add-note',
				element: <AddNote/>
			},
			{
				path: 'notes',
				element: <Notes/>
			},
			{
				path: 'notes/:id',
				element: <Note/>,
				loader: noteLoader(store)
			},
			{
				path: 'profile',
				element: <Profile/>
			}
		]
	},
	{
		path: '/landing',
		element: <Landing/>
	},
	{
		path: '/auth',
		element: <Auth/>
	}
])

const App = () => {
	const dispatch = useDispatch();
	const {isLoading} = useSelector(store => store.user);
	React.useEffect(() => {
		dispatch(showCurrentUser());
	}, []);
	if (isLoading) {
		return (
			<h1>Loading...</h1>
		);
	}
	return (
		<RouterProvider router={router}/>
	);
}

export default App;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IsLoggedIn from '../components/Layout/loggedIn';

const Home = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className=''>
			{user ? (
				<IsLoggedIn />
			) : (
				<h1>This is the Home page You see this if you are logged out </h1>
			)}
		</div>
	);
};

export default Home;

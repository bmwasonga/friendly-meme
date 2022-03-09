import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from '../components/Layout/UserItem';
import { getAllUsers, reset } from '../features/users/userSlice';

function Users() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { users } = useSelector((state) => state.auth);
	console.log('users at this time is : ', users);

	const { user, isLoading, isError, message, totalItems } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getAllUsers());
		console.log(dispatch(getAllUsers()));

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			<section className='heading'>
				<h1>Welcome {user && user?.data.user.name}</h1>
				<p>users Dashboard</p>
			</section>

			<section className='content'>
				{totalItems > 0 ? (
					<div className=''>
						{/* {users.map((user) => (
							<UserItem key={user.id} users={users} />
						))} */}
						hey ass
					</div>
				) : (
					<h3>You do not have any use</h3>
				)}
				{/* {JSON.stringify(users)} */}
			</section>
		</>
	);
}

export default Users;

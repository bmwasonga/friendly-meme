import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from '../components/Layout/UserItem';
import { getAllUsers, reset } from '../features/users/userSlice';

function Users() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const { users, isLoading, isError, message, totalItems } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getAllUsers());

		return () => {
			dispatch(reset());
		};
	}, [users, navigate, isError, message, dispatch, totalItems]);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			<section className='heading'>
				{/* <h1>Welcome {user && user?.data.user.name}</h1> */}
				<p>users Dashboard</p>
			</section>

			<section className='content'>
				{users.length > 0 ? (
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

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, reset } from '../features/tasks/taskSlice';

function Tasks() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const { users } = useSelector((state) => state.auth);

	const { user, task, isLoading, isError, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getAllTasks());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
			<section className='heading'>These are your fetched tasks</section>

			<section className='content'>
				{user.length > 0 ? (
					<div className=''>
						{/* {users.map((user) => (
							<UserItem key={user.id} users={users} />
						))} */}
					</div>
				) : (
					<h3>You do not have any Tasks</h3>
				)}
				{/* {JSON.stringify(users)} */}
			</section>
		</>
	);
}

export default Tasks;

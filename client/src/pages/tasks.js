import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, reset } from '../features/tasks/taskSlice';

function Tasks() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const { tasks, isLoading, isError, message } = useSelector(
		(state) => state.task
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
				{tasks.tasks.length > 0 ? (
					<div className=''>
						{/* {users.map((user) => (
							<UserItem key={user.id} users={users} />
						))} */}
						Ben Wasonga
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

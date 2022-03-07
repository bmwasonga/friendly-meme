import { useState } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useListUsersQuery } from '../features/pages/users';

const Users = () => {
	const [page, setPage] = useState(1);
	const { data: users, isLoading, isFetching } = useListUsersQuery(page);

	if (isLoading) {
		return <div>Loading</div>;
	}

	if (!users?.data) {
		return <div>No users :(</div>;
	}

	return (
		<div>
			{users.data.map(({ id, title, status }) => (
				<div key={id}>
					{title} - {status}
				</div>
			))}
			<button onClick={() => setPage(page - 1)} isLoading={isFetching}>
				Previous
			</button>
			<button onClick={() => setPage(page + 1)} isLoading={isFetching}>
				Next
			</button>
		</div>
	);
};

export default Users;

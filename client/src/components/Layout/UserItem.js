function UserItem({ users }) {
	return (
		<div className='goal'>
			<div>{new Date(users.createdAt).toLocaleString('en-US')}</div>
			<h2>{users.name}</h2>
		</div>
	);
}

export default UserItem;

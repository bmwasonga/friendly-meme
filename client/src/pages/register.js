import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		password: '',
		password2: '',
	});

	const { name, phone, password, password2 } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, loading, success, error, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (error) alert(error);

		if (success || user) navigate('/');

		if (message) alert(message);

		dispatch(reset());
	}, [user, error, success, message, navigate, dispatch]);

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert('Passwords do not match');
		} else {
			const userData = {
				name,
				phone,
				password,
			};
			console.log('the user data is: ', userData);
			dispatch(register(userData));
		}
	};

	if (loading) return <h1>Loading...</h1>;

	return (
		<div className='p-6 flex flex-col'>
			<h1>Register</h1>
			<h2>Please create an account</h2>
			<div className=''>
				<form onSubmit={onSubmit}>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						name='name'
						id='name'
						placeholder='Name'
						value={name}
						onChange={onChange}
					/>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='phone'
						name='phone'
						id='phone'
						placeholder='Phone'
						value={phone}
						onChange={onChange}
					/>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						value={password}
						onChange={onChange}
					/>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='password'
						name='password2'
						id='password2'
						placeholder='Confirm Password'
						value={password2}
						onChange={onChange}
					/>

					<button type='submit'>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Register;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
	const [formData, setFormData] = useState({
		phone: '',
		password: '',
	});

	const { phone, password } = formData;

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

		const userData = {
			phone,
			password,
		};
		dispatch(login(userData));
	};

	return (
		<div className='p-6 flex flex-col'>
			<div className='flex flex-wrap -mx-3 mb-6 justify-center'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<h1>Sign Up</h1>
					<h2>Please up to your account</h2>
					<form onSubmit={onSubmit}>
						<input
							className='shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type='text'
							name='phone'
							id='phone'
							placeholder='Phone'
							value={phone}
							onChange={onChange}
						/>
						<input
							className='shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							value={password}
							onChange={onChange}
						/>

						<button
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='submit'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

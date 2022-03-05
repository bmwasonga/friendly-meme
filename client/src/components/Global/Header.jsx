import { Link , useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

import {logout, reset  }  from '../../features/auth/authSlice'


const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className="flex fex-row justify-around">
      <div className="p-4 font-extrabold text-3xl">Taskify</div>

      {user?  (
        <div className="flex flex-row justify-end">
          <button className="p-2 text-xl" onClick={onLogout}>Logout</button>
        </div>


      ): (
<ul className="flex flex-row">
        <li className="p-6">
          <Link to="/login">Login</Link>
        </li>

        <li className="p-6">
          <Link to="/signUp">Register</Link>
        </li>
      </ul>

      )}
      
    </div>
  );
};

export default Header;

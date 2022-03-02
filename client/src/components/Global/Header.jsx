import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex fex-row justify-around">
      <div className="p-6">Taskify</div>
      <ul className="flex flex-row">
        <li className="p-6">
          <Link to="/login">Login</Link>
        </li>

        <li className="p-6">
          <Link to="/signUp">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

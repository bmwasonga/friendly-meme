import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex fex-row justify-around">
      <div className="p-4 font-extrabold text-3xl">Taskify</div>
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

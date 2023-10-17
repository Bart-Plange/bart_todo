import Logo from '../../public/bartlogo.svg'
import { Link } from 'react-router-dom';

function Navigation() {
  return (
      <nav className="bg-blue-500 p-4 text-white flex justify-between align-center">
          <div>
          <img src={Logo} alt="logo" className='w-8'/>
          </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

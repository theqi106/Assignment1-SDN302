
import { Link } from 'react-router-dom';

const Header: React.FC<{}> = () => {

    return (
        <div>
        <nav className="bg-gray-800">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Quiz App</Link>
          <Link to="/create" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Create Quiz</Link>
          </div>
        </div>
        </nav>
          </div>
    );
};

export default Header;

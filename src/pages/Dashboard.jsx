import { useState } from 'react';
import { FaTasks, FaCalendar, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import ToDo from '../components/Todo';
import Calendar from '../components/Calendar';
import Profile from '../components/Profile';


function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const renderContent = () => {
    switch (selectedLink) {
      case 'ToDo':
        return <ToDo />;
      case 'Calendar':
        return <Calendar />;
      case 'Profile':
        return <Profile />;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

  const mainContentStyle = {
    marginLeft: isSidebarOpen ? '1/5' : 0, // Adjust the width based on the sidebar state
    paddingLeft: isSidebarOpen ? '20rem' : 0, // Adjust the padding to create space for the sidebar
  };

  const sidebarStyle = {
    display: isSidebarOpen ? 'block' : 'none', // Hide the sidebar when closed
  };

  return (
    <div className="relative flex">
      {/* Menu Icon (always at the top left) */}
      <button onClick={handleSidebarToggle} className="text-white text-2xl absolute left-0 top-0 mt-6 ml-6 z-10">
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`fixed top-0 left-0 h-full w-full md:w-1/5 bg-gray-900 text-white md:p-6 p-4`} style={sidebarStyle}>
        <div className="profile text-center">
          <img src="profile-picture.jpg" alt="Profile Picture" className="w-16 h-16 rounded-full mx-auto mb-2" />
          <p className="text-xl font-bold">User Name</p>
        </div>

        <div className='pt-48'>
          <a href="#" className="flex items-center text-white hover:bg-gray-700 py-2 px-4 my-2" onClick={() => handleLinkClick('ToDo')}>
            <FaTasks className="mr-2" /> ToDo
          </a>
          <a href="#" className="flex items-center text-white hover:bg-gray-700 py-2 px-4 my-2" onClick={() => handleLinkClick('Calendar')}>
            <FaCalendar className="mr-2" /> Calendar
          </a>
          <a href="#" className="flex items-center text-white hover.bg-gray-700 py-2 px-4 my-2" onClick={() => handleLinkClick('Profile')}>
            <FaUser className="mr-2" /> Profile
          </a>
        </div>

        <div className="logout text-center pt-16">
          <a href="#" className="flex items-center text-white hover:bg-gray-700 py-2 px-4 my-2">
            <FaSignOutAlt className="mr-2" /> Logout
          </a>
        </div>
      </div>

      <div style={mainContentStyle} className="p-6 bg-gray-200 w-full">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;

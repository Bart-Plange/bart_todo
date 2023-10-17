import { useState } from 'react';

function Profile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '********',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserData({
      ...userData,
      password: newPassword || userData.password,
      email: newEmail || userData.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="text-lg font-semibold block mb-2">Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-lg">{userData.name}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold block mb-2">Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={newEmail || userData.email}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-lg">{userData.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="text-lg font-semibold block mb-2">Password:</label>
        {isEditing ? (
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-lg">********</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
            Save
          </button>
        ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;

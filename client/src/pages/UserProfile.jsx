import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const userId = currentUser.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/user/${userId}`, {
        username: user.username,
        email: user.email,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <img
          src={user.img} // Use the correct property from the user object
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        {editMode ? (
          <div>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="block w-full mt-2 p-2 border rounded"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mt-4">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode && (
          <button
            onClick={handleSave}
            className="mt-4 ml-2 bg-green-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

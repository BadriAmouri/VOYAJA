import React, { useState, useEffect } from "react";
import axios from "axios";
import SideMenu from "./sideMenu";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users in the frontend *************...");
      const response = await axios.get("http://localhost:5000/admin/users");
      console.log("Users data:", response.data);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setSearchTerm(searchValue);

    const filtered = users.filter(
      (user) =>
        user.client_first_name.toLowerCase().includes(searchValue) ||
        user.client_last_name.toLowerCase().includes(searchValue) ||
        user.client_email.toLowerCase().includes(searchValue) // Search by email
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="flex flex-row items-start justify-between">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div
        className="p-6 bg-white shadow-lg rounded-lg mb-10 text-black mt-10"
        style={{ marginLeft: "300px", width: "1180px" }}
      >
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Users Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Phone Number</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b">
                    {user.client_first_name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {user.client_last_name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {user.client_phone_number}
                  </td>
                  <td className="px-4 py-2 border-b">{user.client_email}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(user.join_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-2 border-b text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

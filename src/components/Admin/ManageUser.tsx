import { useState } from "react";
import { User } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Sample data
const usersData: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+123456789", role: "teacher" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+987654321", role: "student" },
  { id: "3", name: "Alice Brown", email: "alice@example.com", phone: "+112233445", role: "teacher" },
  { id: "4", name: "Bob White", email: "bob@example.com", phone: "+998877665", role: "student" },
  // Add more sample users as needed
];

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);
  const [selectedTab, setSelectedTab] = useState("teacher"); // "teacher" or "student"
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering by ID

  // Handling actions
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleBlockUser = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, blocked: true } : user));
  };

  const handleAddUser = () => {
    // Example of adding a new user
    const newUser: User = {
      id: Date.now().toString(),
      name: "New User",
      email: "newuser@example.com",
      phone: "+111223344",
      role: "student", // Set default role (can be teacher or student)
    };
    setUsers([...users, newUser]);
  };

  const filteredUsers = users.filter(
    (user) => user.role === selectedTab && user.id.includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Add User Button */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={handleAddUser}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md"
        >
          Add User
        </Button>
      </motion.div>

      {/* Tabs for Teacher/Student */}
      <div className="mb-4">
        <Button
          onClick={() => setSelectedTab("teacher")}
          className={`mr-4 px-4 py-2 rounded-md ${selectedTab === "teacher" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Teachers
        </Button>
        <Button
          onClick={() => setSelectedTab("student")}
          className={`px-4 py-2 rounded-md ${selectedTab === "student" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Students
        </Button>
      </div>

      {/* Search by ID */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <motion.div
        className="overflow-hidden shadow-xl rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleBlockUser(user.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-md px-3 py-1"
                    >
                      Block
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Edit Modal */}
      {selectedUser && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Edit User: {selectedUser.name}
                </DialogTitle>
              </DialogHeader>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </Button>
                </motion.div>
              </form>

              <Button
                onClick={handleCloseModal}
                className="mt-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </Button>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </div>
  );
};

export default ManageUser;

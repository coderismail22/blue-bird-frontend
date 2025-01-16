import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FilePenLine } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "./EditProfile";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
 
    return (
    <>
      {/* Welcome Section */}
      <motion.div
        className="flex justify-between items-center my-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Message */}
        <div>
          <h1 className="text-xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-montserrat shadow-2xl">
            Welcome to Mr. Jone
          </h1>
        </div>
        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant={"ghost"}   className="flex items-center gap-2 px-4 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:to-purple-500 shadow-lg transition-all duration-300 ease-in-out rounded-lg" 
          onClick={handleModalToggle}>
            <span className="text-2xl">
              <FilePenLine />
            </span>
            Edit
          </Button>
        </motion.div>
      </motion.div>

      {/* Stylish Divider */}
      <motion.div
        className="w-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.7 }}
      >
        <hr className="border-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg" />
      </motion.div>

      {/* Profile Card */}
      <div className="flex items-center justify-center mt-10">
        <motion.div
          className="max-w-4xl w-full p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-2xl rounded-xl">
            {/* Profile Image */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://www.shutterstock.com/image-photo/serious-successful-arabian-businessman-formal-260nw-1879913899.jpg"
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-md"
              />
            </motion.div>

            {/* Profile Details */}
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CardHeader>
                <h2 className="text-2xl font-semibold text-gray-800">
                  John Doe
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <p className="text-gray-600 text-lg">
                  <strong>Phone:</strong> +123 456 7890
                </p>
                <motion.button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit Profile
                </motion.button>
              </CardContent>
            </motion.div>
          </Card>
        </motion.div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={handleModalToggle} />
    </>
  );
};

export default Profile;

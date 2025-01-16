import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const AdmissionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Your application has been submitted successfully!");
    reset();
  };

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800">Admission Apply</h2>
          <p className="text-gray-600 mt-4">
            Fill out the form below to apply for admission to our institution.
          </p>
        </motion.div>

        {/* Admission Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Class to Apply */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Class to Apply</label>
              <select
                {...register("class", { required: "Please select a class" })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 ${
                  errors.class ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a class</option>
                <option value="Play">Play</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
              <textarea
                {...register("message")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                placeholder="Add any additional information"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionForm;

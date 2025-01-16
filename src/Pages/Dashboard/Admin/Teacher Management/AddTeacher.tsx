import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { useState } from "react";
import AppSelect from "@/components/CustomForm/AppSelect";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

// Create teacher function
const createTeacher = async (teacherData: {
  name: string;
  teacherId: string;
  profileImg: string;
  email: string;
  password: string;
  phone: string;
  bloodGroup: string;
  salary: number;
  address: string;
}) => {
  const response = await axiosInstance.post(
    "/users/create-teacher",
    teacherData
  );
  return response.data;
};

const AddTeacher = () => {
  const [profileImg, setProfileImg] = useState<string>(""); // Handle batch image

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for creating a teacher
  const mutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      Swal.fire("Success!", "Teacher added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate("/dashboard/admin/teacher-management/all-teachers");
    },
    onError: (err: AxiosError<BackendErrorResponse>) => {
      console.log(err);
      handleAxiosError(err, "Failed to add teacher");
      // Swal.fire("Error!", "Failed to add teacher. Please try again.", "error");
    },
  });

  const onSubmit = (data: {
    name: string;
    teacherId: string;
    profileImg: string;
    email: string;
    password: string;
    phone: string;
    bloodGroup: string;
    salary: number;
    address: string;
  }) => {
    const finalData = {
      ...data,
      profileImg,
    };

    mutation.mutate(finalData);
    // console.log(finalData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Add Teacher
      </h1>
      <AppForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          teacherId: "",
          email: "",
          password: "",
          address: "",
          salary: 0,
          phone: "",
          bloodGroup: "",
        }}
        buttonText="Add Teacher"
      >
        {/* Teacher Name */}
        <AppInput
          name="name"
          label="Teacher Name"
          placeholder="Enter teacher name"
        />

        {/* Teacher ID */}
        <AppInput
          name="teacherId"
          label="Teacher ID"
          placeholder="Enter teacher ID"
        />

        {/* Image Upload Section */}
        <div className="text-sm truncate my-4">
          <label className="block font-medium text-black ">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setProfileImg} />
          {profileImg === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Email */}
        <AppInput name="email" label="Email" placeholder="Enter email" />

        {/* Password */}
        <AppInputPassword
          className="w-full mb-4 bg-white border border-blue-400 text-black placeholder-gray-500 focus:ring focus:ring-blue-500 focus:border-blue-500"
          name="password"
          label="Password"
          labelStyles="text-black"
          placeholder="Enter your password"
        />
        {/* Phone */}
        <AppInput name="phone" label="Phone" placeholder="Enter phone number" />
        {/* Salary */}
        <AppInput name="salary" label="Salary" placeholder="Enter salary" />
        {/* Address */}
        <AppInput name="address" label="Address" placeholder="Enter Address" />
        {/* Bloodgroup */}
        <AppSelect
          name="bloodGroup"
          label="Blood Group"
          placeholder="Select a blood group"
          options={[
            {
              value: "A+",
              label: "A+",
            },
            {
              value: "A-",
              label: "A-",
            },
            {
              value: "B+",
              label: "B+",
            },
            {
              value: "B-",
              label: "B-",
            },
            {
              value: "AB",
              label: "AB+",
            },
            {
              value: "AB-",
              label: "AB-",
            },
            {
              value: "O+",
              label: "O+",
            },
            {
              value: "O-",
              label: "O-",
            },
          ]}
        />
      </AppForm>
    </div>
  );
};

export default AddTeacher;

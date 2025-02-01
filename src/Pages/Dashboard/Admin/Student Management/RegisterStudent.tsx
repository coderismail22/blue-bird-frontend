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
import AppYearPicker from "@/components/CustomForm/AppYearPicker";

// Register student function
const registerStudent = async (studentData: {
  name: string;
  studentId: string;
  roll: string;
  profileImg: string;
  email: string;
  password: string;
  phone: string;
  guardianName: string;
  address: string;
  bloodGroup: string;
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  group: string;
}) => {
  const response = await axiosInstance.post(
    "/users/register-student",
    studentData
  );
  return response.data;
};

const RegisterStudent = () => {
  const [profileImg, setProfileImg] = useState<string>(""); // Handle profile image

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for registering a student
  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      Swal.fire("Success!", "Student registered successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/dashboard/admin/student-management/register-student");
    },
    onError: (err: AxiosError<BackendErrorResponse>) => {
      console.log(err);
      handleAxiosError(err, "Failed to register student");
    },
  });

  const onSubmit = (data: {
    name: string;
    studentId: string;
    roll: string;
    profileImg: string;
    email: string;
    password: string;
    phone: string;
    guardianName: string;
    address: string;
    bloodGroup: string;
    year: string;
    version: string;
    shift: string;
    class: string;
    section: string;
    group: string;
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
        Register Student
      </h1>
      <AppForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          studentId: "",
          roll: "",
          email: "",
          password: "",
          phone: "",
          guardianName: "",
          address: "",
          bloodGroup: "",
          year: "",
          version: "",
          shift: "",
          class: "",
          section: "",
          group: "",
        }}
        buttonText="Register Student"
      >
        {/* Student Name */}
        <AppInput
          name="name"
          label="Student Name"
          placeholder="Enter student name"
        />

        {/* Student ID */}
        <AppInput
          name="studentId"
          label="Student ID"
          placeholder="Enter student ID"
        />
        {/* Roll */}
        <AppInput
          name="roll"
          label="Class Roll"
          placeholder="Enter student class roll"
        />

        {/* Image Upload Section */}
        <div className="text-sm truncate my-4">
          <label className="block font-medium text-black ">
            Upload Profile Image
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

        {/* Guardian Name */}
        <AppInput
          name="guardianName"
          label="Guardian Name"
          placeholder="Enter guardian's name"
        />

        {/* Address */}
        <AppInput name="address" label="Address" placeholder="Enter address" />

        {/* Blood Group */}
        <AppSelect
          name="bloodGroup"
          label="Blood Group"
          placeholder="Select a blood group"
          options={[
            { value: "A+", label: "A+" },
            { value: "A-", label: "A-" },
            { value: "B+", label: "B+" },
            { value: "B-", label: "B-" },
            { value: "AB+", label: "AB+" },
            { value: "AB-", label: "AB-" },
            { value: "O+", label: "O+" },
            { value: "O-", label: "O-" },
          ]}
        />

        {/* Year Picker */}
        <AppYearPicker name="year" label="Year" />

        {/* Version*/}
        <AppSelect
          name="version"
          label="Version"
          placeholder="Select a version"
          options={[
            { value: "Bangla", label: "Bangla" },
            { value: "English", label: "English" },
          ]}
        />

        {/* Shift */}
        <AppSelect
          name="shift"
          label="Shift"
          placeholder="Select a shift"
          options={[
            { value: "Morning", label: "Morning" },
            { value: "Day", label: "Day" },
            { value: "Evening", label: "Evening" },
          ]}
        />

        {/* Class */}
        <AppSelect
          name="class"
          label="Class"
          placeholder="Select a class"
          options={[
            { value: "7", label: "Seven" },
            { value: "8", label: "Eight" },
            { value: "9", label: "Nine" },
            { value: "10", label: "Ten" },
          ]}
        />

        {/* Section */}
        <AppSelect
          name="section"
          label="Section"
          placeholder="Select a section"
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" },
          ]}
        />

        {/* Group (Optional) */}
        <AppSelect
          name="group"
          label="Group (If Applicable)"
          placeholder="Select a group"
          options={[
            { value: "Science", label: "Science" },
            { value: "Arts", label: "Arts" },
            { value: "Commerce", label: "Commerce" },
            { value: "NA", label: "NA" },
          ]}
        />
      </AppForm>
    </div>
  );
};

export default RegisterStudent;

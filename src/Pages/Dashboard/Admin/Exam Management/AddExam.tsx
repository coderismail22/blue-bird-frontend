import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppSelect from "@/components/CustomForm/AppSelect";
import AppYearPicker from "@/components/CustomForm/AppYearPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import { handleAxiosError } from "@/utils/handleAxiosError";
import DynamicSelectField from "@/components/CustomForm/DynamicSelect";

// ✅ Add exam function
const addExam = async (examData: {
  name: string;
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  group?: string;
  subjects: string[];
}) => {
  const response = await axiosInstance.post("/exams/add-exam", examData);
  return response.data;
};

const AddExam = () => {
  const [subjectOptions] = useState([
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "History", label: "History" },
  ]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addExam,
    onSuccess: () => {
      Swal.fire("Success!", "Exam added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      navigate("/dashboard/admin/exam-management/all-exams");
    },
    onError: (err: AxiosError<BackendErrorResponse>) => {
      console.log(err);
      handleAxiosError(err, "Failed to add exam");
    },
  });

  const onSubmit = (data: {
    name: string;
    year: string;
    version: string;
    shift: string;
    class: string;
    section: string;
    group?: string;
    subjects: string[];
  }) => {
    // mutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Add Exam
      </h1>
      <AppForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          year: "",
          version: "",
          shift: "",
          class: "",
          section: "",
          group: "",
          subjects: [],
        }}
        buttonText="Add Exam"
      >
        {/* Exam Name */}
        <AppInput name="name" label="Exam Name" placeholder="Enter exam name" />

        {/* Year Picker */}
        <AppYearPicker name="year" label="Year" />

        {/* Version */}
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
          label="Group (Optional)"
          placeholder="Select a group"
          options={[
            { value: "Science", label: "Science" },
            { value: "Commerce", label: "Commerce" },
            { value: "Arts", label: "Arts" },
            { value: "NA", label: "NA" },
          ]}
        />

        {/* Dynamic Subject Selection */}
        <DynamicSelectField
          label="Subjects"
          placeholder="Select subjects"
          options={subjectOptions}
          onChange={(selectedValues) => {
            // Update form state manually if needed
            console.log("Selected subjects:", selectedValues);
          }}
          defaultValue={[]}
        />
      </AppForm>
    </div>
  );
};

export default AddExam;

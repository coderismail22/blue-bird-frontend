// TakeAttendance.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axiosInstance";
import CustomDateInput from "./CustomDateInput";
import Swal from "sweetalert2";
import "../../../styles/swal.css";
const YEARS = ["2025", "2026", "2027", "2028", "2029", "2030"];
const VERSIONS = ["Bangla", "English"];
const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SECTIONS = ["A", "B", "C", "D", "E", "F"];
const SHIFTS = ["Morning", "Day", "Evening"];
const GROUPS = ["Science", "Commerce", "Arts", "NA"];

interface ILoadForm {
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  group: "Science" | "Commerce" | "Arts" | "NA";
  date: string;
}

interface IAttendanceFrontend {
  _id?: string;
  student: string;
  roll: string;
  date: string;
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  status: "present" | "absent" | "late" | "leave";
  group: "Science" | "Commerce" | "Arts" | "NA";
  studentName?: string;
  studentId?: string;
}

const TakeAttendance: React.FC = () => {
  // 1. Use react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    // If you need formState: { errors }, etc.
  } = useForm<ILoadForm>({
    defaultValues: {
      year: "",
      version: "",
      shift: "",
      class: "",
      section: "",
      group: "",
      date: "",
    },
  });

  // Watch the entire form for refetch usage
  const watchFilters = watch();

  const [attendanceData, setAttendanceData] = useState<IAttendanceFrontend[]>(
    []
  );

  // 2. Load attendance from backend
  const onLoadAttendance = async (formData: ILoadForm) => {
    if (
      !formData.year ||
      !formData.version ||
      !formData.shift ||
      !formData.class ||
      !formData.section ||
      !formData.group ||
      !formData.date
    ) {
      Swal.fire({
        icon: "info",
        title: "Failed",
        text: "All the fields are required!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      return;
    }

    try {
      const res = await axiosInstance.get("/attendance", { params: formData });
      const dataFromServer = res.data.data;

      // Format data for easy display
      const formatted: IAttendanceFrontend[] = dataFromServer.map(
        // TODO: Add type here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => ({
          _id: item?.studentDoc?._id,
          student:
            typeof item?.student === "object"
              ? item?.student?._id
              : item?.student,
          roll: item?.studentDoc?.roll || "",
          date: item?.date,
          year: item?.year,
          version: item?.version,
          shift: item?.shift,
          class: item?.class,
          section: item?.section,
          group: item?.group,
          status: item?.status,
          studentName: item?.studentDoc?.name,
          studentId: item?.studentDoc?.studentId,
        })
      );

      setAttendanceData(formatted);
    } catch (error) {
      console.error(error);
      alert("Failed to load attendance!");
    }
  };

  // 3. Handle status changes in local state
  const handleStatusChange = (
    index: number,
    statusValue: IAttendanceFrontend["status"]
  ) => {
    setAttendanceData((prev) => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], status: statusValue };
      return newArr;
    });
  };

  // 4. Save updated attendance and immediately refetch using watchFilters
  const onSaveAttendance = async () => {
    try {
      await axiosInstance.patch("/attendance", attendanceData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attendance updated successfully!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });

      // Immediately refetch with the same form data:
      onLoadAttendance(watchFilters);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Attendance update failed!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center underline underline-offset-4 text-blue-400">
        Attendance
      </h2>

      {/* Form to load attendance */}
      <form
        onSubmit={handleSubmit(onLoadAttendance)}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Year
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("year")}
            >
              <option value="">Select Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          {/* Version */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Version
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("version")}
            >
              <option value="">Select Version</option>

              {VERSIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          {/* Shift */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Shift
            </label>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("shift")}
            >
              <option value="">Select Shift</option>
              {SHIFTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {/* Class */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Class
            </label>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("class")}
            >
              <option value="">Select Class</option>

              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Section
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("section")}
            >
              <option value="">Select Section</option>

              {SECTIONS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
          {/* Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Group
            </label>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
              {...register("group")}
            >
              <option value="">Select Group</option>
              {GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          {/* Date */}
          <CustomDateInput register={register} />{" "}
          {/* Use the DateInput component */}
        </div>

        <div className="my-5 flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Load
          </button>
        </div>
      </form>

      {/* Attendance Table */}
      {attendanceData.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border">
              <th className="border p-2 text-center">SID</th>
              <th className="border p-2 text-center">Roll</th>
              <th className="border p-2 text-center">Name</th>
              <th className="border p-2 text-center">Present</th>
              <th className="border p-2 text-center">Absent</th>
              <th className="border p-2 text-center">Late</th>
              <th className="border p-2 text-center">Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, idx) => (
              <tr key={idx} className="border">
                <td className="border p-2 text-center">{item?.studentId}</td>
                <td className="border p-2 text-center">{item?.roll || "NA"}</td>
                <td className="border p-2 text-center">{item?.studentName}</td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.status === "present"}
                    onChange={() => handleStatusChange(idx, "present")}
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.status === "absent"}
                    onChange={() => handleStatusChange(idx, "absent")}
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.status === "late"}
                    onChange={() => handleStatusChange(idx, "late")}
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.status === "leave"}
                    onChange={() => handleStatusChange(idx, "leave")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {attendanceData.length == 0 && (
        <p className="text-center text-red-500">No Students Found</p>
      )}
      {/* Save Button */}
      <div className="flex items-center justify-center">
        {attendanceData.length > 0 && (
          <button
            onClick={onSaveAttendance}
            className=" bg-green-600 text-white px-6 py-2 mt-4 rounded"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;

// TakeAttendance.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axiosInstance";

const YEARS = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
const VERSIONS = ["Bangla", "English"];
const CLASSES = ["6", "7", "8", "9", "10", "11", "12"];
const SECTIONS = ["A", "B", "C", "D"];
const SHIFTS = ["Morning", "Day", "Evening"];
const GROUPS = ["Science", "Commerce", "Arts", "NA"];

interface ILoadForm {
  year: string;
  version: string;
  shift: string;
  class: string;
  section: string;
  group: "Science" | "Commerce" | "Arts" | "NA";
  date: string; // e.g., "2025-01-31"
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
      year: "2026",
      version: "Bangla",
      shift: "Day",
      class: "9",
      section: "A",
      group: "Science",
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
      alert(
        "All fields (Year, Version, Shift, Class, Section, Group, Date) are required!"
      );
      return;
    }

    try {
      const res = await axiosInstance.get("/attendance", { params: formData });
      const dataFromServer = res.data.data;

      // Format data for easy display
      const formatted: IAttendanceFrontend[] = dataFromServer.map(
        (item: any) => ({
          _id: item?.studentDoc?._id,
          student:
            typeof item?.student === "object" ? item.student._id : item.student,
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
      alert("Attendance updated successfully!");

      // Immediately refetch with the same form data:
      onLoadAttendance(watchFilters);
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      {/* Form to load attendance */}
      <form
        onSubmit={handleSubmit(onLoadAttendance)}
        className="flex flex-wrap gap-4 mb-4"
      >
        <div>
          <label>Year</label>
          <br />
          <select className="border p-1" {...register("year")}>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Version</label>
          <br />
          <select className="border p-1" {...register("version")}>
            {VERSIONS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Shift</label>
          <br />
          <select className="border p-1" {...register("shift")}>
            {SHIFTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Class</label>
          <br />
          <select className="border p-1" {...register("class")}>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Section</label>
          <br />
          <select className="border p-1" {...register("section")}>
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Group</label>
          <br />
          <select className="border p-1" {...register("group")}>
            {GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date</label>
          <br />
          <input type="date" className="border p-1" {...register("date")} />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
              <th className="border p-2">Prime ID</th>
              <th className="border p-2">Custom ID</th>
              <th className="border p-2">Roll</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Absent</th>
              <th className="border p-2">Late</th>
              <th className="border p-2">Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, idx) => (
              <tr key={idx} className="border">
                <td className="border p-2">{item?._id}</td>
                <td className="border p-2">{item?.studentId}</td>
                <td className="border p-2">{item?.roll || "NA"}</td>
                <td className="border p-2">{item?.studentName}</td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={item.status === "present"}
                    onChange={() => handleStatusChange(idx, "present")}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={item.status === "absent"}
                    onChange={() => handleStatusChange(idx, "absent")}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={item.status === "late"}
                    onChange={() => handleStatusChange(idx, "late")}
                  />
                </td>
                <td className="border p-2">
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

      {/* If no students found */}
      {attendanceData.length === 0 && <p>No students found.</p>}

      {/* Save Button */}
      {attendanceData.length > 0 && (
        <button
          onClick={onSaveAttendance}
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default TakeAttendance;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Types
type Student = {
  id: string;
  name: string;
};

type Class = {
  id: string;
  name: string;
  sections: Section[];
};

type Section = {
  id: string;
  name: string;
  groups?: Group[];
  students: Student[];
};

type Group = {
  id: string;
  name: string;
  students: Student[];
};

type Attendance = {
  studentId: string;
  isPresent: boolean;
};

// Sample Data
const classes: Class[] = [
  {
    id: "1",
    name: "Play",
    sections: [
      { id: "1A", name: "A", students: [{ id: "1", name: "John Doe" }] },
      { id: "1B", name: "B", students: [{ id: "2", name: "Jane Smith" }] },
    ],
  },
  {
    id: "5",
    name: "Class 5",
    sections: [
      { id: "5A", name: "A", students: [{ id: "3", name: "Alice Brown" }] },
      { id: "5B", name: "B", students: [{ id: "4", name: "Bob White" }] },
    ],
  },
  {
    id: "9",
    name: "Class 9",
    sections: [
      {
        id: "9A",
        name: "A",
        groups: [
          { id: "science", name: "Science", students: [{ id: "5", name: "Charlie Green" }] },
          { id: "arts", name: "Arts", students: [{ id: "6", name: "David Black" }] },
        ],
        students: [],
      },
    ],
  },
];

const TakeAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClassChange = (classId: string) => {
    const selectedClass = classes.find((cls) => cls.id === classId);
    setSelectedClass(selectedClass || null);
    setSelectedSection(null);
    setSelectedGroup(null);
    setAttendance([]);
  };

  const handleSectionChange = (sectionId: string) => {
    const selectedSection = selectedClass?.sections.find((sec) => sec.id === sectionId);
    setSelectedSection(selectedSection || null);
    setSelectedGroup(null);
    if (selectedSection?.students) {
      setAttendance(
        selectedSection.students.map((student) => ({
          studentId: student.id,
          isPresent: false,
        }))
      );
    }
  };

  const handleGroupChange = (groupId: string) => {
    const selectedGroup = selectedSection?.groups?.find((grp) => grp.id === groupId);
    setSelectedGroup(selectedGroup || null);
    if (selectedGroup?.students) {
      setAttendance(
        selectedGroup.students.map((student) => ({
          studentId: student.id,
          isPresent: false,
        }))
      );
    }
  };

  const handleAttendanceChange = (studentId: string) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((entry) =>
        entry.studentId === studentId
          ? { ...entry, isPresent: !entry.isPresent }
          : entry
      )
    );
  };

  const handleSubmitAttendance = () => {
    console.log("Attendance submitted:", attendance);
    setIsModalOpen(false);
    setAttendance([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Take Attendance</h1>

      {/* Select Class */}
      <div className="mb-6 flex flex-col md:flex-row md:gap-6">
  <div className="flex-1">
    <label className="block text-lg font-medium text-gray-700">Select Class</label>
    <select
      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
      onChange={(e) => handleClassChange(e.target.value)}
      value={selectedClass ? selectedClass.id : ""}
    >
      <option value="">Select a class</option>
      {classes.map((cls) => (
        <option key={cls.id} value={cls.id}>
          {cls.name}
        </option>
      ))}
    </select>
  </div>

  {/* Select Section */}
  {selectedClass && (
    <div className="flex-1">
      <label className="block text-lg font-medium text-gray-700">Select Section</label>
      <select
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        onChange={(e) => handleSectionChange(e.target.value)}
        value={selectedSection ? selectedSection.id : ""}
      >
        <option value="">Select a section</option>
        {selectedClass.sections.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.name}
          </option>
        ))}
      </select>
    </div>
  )}

  {/* Select Group */}
  {selectedSection?.groups && (
    <div className="flex-1">
      <label className="block text-lg font-medium text-gray-700">Select Group</label>
      <select
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        onChange={(e) => handleGroupChange(e.target.value)}
        value={selectedGroup ? selectedGroup.id : ""}
      >
        <option value="">Select a group</option>
        {selectedSection.groups.map((grp) => (
          <option key={grp.id} value={grp.id}>
            {grp.name}
          </option>
        ))}
      </select>
    </div>
  )}
</div>


      {/* Show Students */}
      {(selectedSection?.students || selectedGroup?.students) && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedClass?.name} - {selectedSection?.name}
            {selectedGroup && ` (${selectedGroup.name})`} Students
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Present</th>
              </tr>
            </thead>
            <tbody>
              {(selectedGroup?.students || selectedSection?.students || []).map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Checkbox
                      checked={attendance.find((att) => att.studentId === student.id)?.isPresent}
                      onChange={() => handleAttendanceChange(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Attendance Button */}
      <Button onClick={() => setIsModalOpen(true)} className="mt-6 bg-blue-600 text-white">
        Submit Attendance
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold text-gray-800">Confirm Attendance</DialogTitle>
    </DialogHeader>
    <div className="overflow-auto max-h-96">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((att, index) => (
            <tr key={att.studentId} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {selectedGroup
                  ? selectedGroup.students.find((s) => s.id === att.studentId)?.name
                  : selectedSection?.students.find((s) => s.id === att.studentId)?.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {att.isPresent ? "Present" : "Absent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex space-x-4 mt-6">
      <Button onClick={handleSubmitAttendance} className="bg-green-600 text-white">
        Confirm
      </Button>
      <Button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white">
        Cancel
      </Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default TakeAttendance;

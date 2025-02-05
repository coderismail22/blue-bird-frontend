import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

// Fetch exams dynamically based on filters
const fetchExams = async (queryParams: string) => {
  const response = await axiosInstance.get(`/exams?${queryParams}`);
  return response.data.data;
};

// Fetch students and results
const fetchStudents = async ({ queryKey }: any) => {
  const [, examId] = queryKey;
  const response = await axiosInstance.get(
    `/exam-registrations?examId=${examId}`
  );
  return response.data.data;
};

const fetchResults = async ({ queryKey }: any) => {
  const [, examId, examSubjectId] = queryKey;
  const response = await axiosInstance.get(
    `/exam-results?examId=${examId}&examSubjectId=${examSubjectId}`
  );
  return response.data.data;
};

const ReadOnlyResults = () => {
  // States for dropdowns
  const [years, setYears] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [shifts] = useState<string[]>(["Morning", "Day", "Evening"]);
  const [sections, setSections] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);

  // Selection states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  // State to store subjects, marks, and students
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);

  // Fetch dropdown data dynamically
  useEffect(() => {
    axiosInstance
      .get("/students/years")
      .then((response) => setYears(response.data.data || []))
      .catch((error) => console.error("Failed to fetch years:", error));
  }, []);

  const handleYearChange = async (year: string) => {
    setSelectedYear(year);
    resetSelections();
    const response = await axiosInstance.get(`/students/versions/${year}`);
    setVersions(response.data.data || []);
  };

  const handleVersionChange = async (version: string) => {
    setSelectedVersion(version);
    resetSelections(true);
    const response = await axiosInstance.get(
      `/students/classes/${selectedYear}/${version}`
    );
    setClasses(response.data.data || []);
  };

  const handleClassChange = async (className: string) => {
    setSelectedClass(className);
    resetSelections(true, true);
    const response = await axiosInstance.get(
      `/students/sections/${selectedYear}/${selectedVersion}/${className}`
    );
    setSections(response.data.data || []);

    if (parseInt(className) >= 9) {
      const groupResponse = await axiosInstance.get(
        `/students/groups/${selectedYear}/${selectedVersion}/${className}`
      );
      setGroups(groupResponse.data.data || []);
    } else {
      setGroups([]);
      setSelectedGroup("");
    }
  };

  const handleShiftChange = (shift: string) => setSelectedShift(shift);
  const handleSectionChange = (section: string) => setSelectedSection(section);
  const handleGroupChange = (group: string) => setSelectedGroup(group);

  const resetSelections = (keepVersion = false, keepClass = false) => {
    if (!keepVersion) setSelectedVersion("");
    if (!keepClass) setSelectedClass("");
    setSelectedShift("");
    setSelectedSection("");
    setSelectedGroup("");
    setStudents([]);
  };

  // Fetch exams based on filters
  const filterParams = new URLSearchParams({
    year: selectedYear,
    version: selectedVersion,
    className: selectedClass,
    shift: selectedShift,
    section: selectedSection,
    group: selectedGroup,
  }).toString();

  const { data: exams } = useQuery({
    queryKey: ["exams", filterParams],
    queryFn: () => fetchExams(filterParams),
    enabled: !!(
      selectedYear &&
      selectedVersion &&
      selectedClass &&
      selectedShift &&
      selectedSection
    ),
  });

  // Fetch students and results
  const { data: registeredStudents } = useQuery({
    queryKey: ["students", selectedExamId],
    queryFn: fetchStudents,
    enabled: !!selectedExamId,
  });

  const { data: results } = useQuery({
    queryKey: ["results", selectedExamId, selectedSubjectId],
    queryFn: fetchResults,
    enabled: !!selectedExamId && !!selectedSubjectId,
  });

  // Combine students and results data
  useEffect(() => {
    if (registeredStudents && results) {
      const studentMarksMap = results.reduce((acc: any, result: any) => {
        acc[result.studentId._id] = result.marks;
        return acc;
      }, {});

      const combinedStudents = registeredStudents.map((registration: any) => ({
        ...registration,
        marks: studentMarksMap[registration.studentId._id] || {},
      }));

      setStudents(combinedStudents);
      setMarksData(
        combinedStudents.reduce(
          (acc: any, student: any) => ({
            ...acc,
            [student.studentId._id]: student.marks,
          }),
          {}
        )
      );
    }
  }, [registeredStudents, results]);

  const handleExamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const examId = event.target.value;
    setSelectedExamId(examId);
    const selectedExam = exams?.find((exam: any) => exam._id === examId);
    if (selectedExam) setSubjects(selectedExam.subjects);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjectId(e.target.value);
  };

  return (
    <div className="mx-auto p-6 font-robotoCondensed">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500 ">
        Find Results
      </h1>

      {/* Dropdowns */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Year Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Year:
          </label>
          <select
            onChange={(e) => handleYearChange(e.target.value)}
            value={selectedYear}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Version Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Version:
          </label>
          <select
            onChange={(e) => handleVersionChange(e.target.value)}
            value={selectedVersion}
            disabled={!selectedYear}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white ${
              !selectedYear
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Version</option>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Class:
          </label>
          <select
            onChange={(e) => handleClassChange(e.target.value)}
            value={selectedClass}
            disabled={!selectedVersion}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white ${
              !selectedVersion
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Class</option>
            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Shift:
          </label>
          <select
            onChange={(e) => handleShiftChange(e.target.value)}
            value={selectedShift}
            disabled={!selectedClass}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white ${
              !selectedClass
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Shift</option>
            {shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>

        {/* Section Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Section:
          </label>
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
            disabled={!selectedShift}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white ${
              !selectedShift
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {/* Group Selection */}
        {parseInt(selectedClass) >= 9 && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Group:
            </label>
            <select
              onChange={(e) => handleGroupChange(e.target.value)}
              value={selectedGroup}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
            >
              <option value="">Select Group</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Exam Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Select Exam:
          </label>
          <select
            onChange={handleExamChange}
            value={selectedExamId}
            className="w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose an exam</option>
            {exams?.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.name} ({exam.year})
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Select Subject:
          </label>
          <select
            onChange={handleSubjectChange}
            value={selectedSubjectId}
            disabled={!selectedExamId}
            className={`w-full px-4 py-2 border rounded-md shadow-sm transition-all bg-white ${
              !selectedExamId
                ? "bg-gray-200 cursor-not-allowed"
                : "border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="">Choose a subject</option>
            {subjects.map((subject: any) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table for displaying marks */}
      {selectedSubjectId && (
        <table className="w-full mt-6 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-center">Roll</th>
              <th className="p-2 border text-center">Student Name</th>
              <th className="p-2 border text-center">Photo</th>
              <th className="p-2 border text-center">MCQ</th>
              <th className="p-2 border text-center">CQ</th>
              <th className="p-2 border text-center">Practical</th>
              <th className="p-2 border text-center">Plain</th>
              <th className="p-2 border text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const stu = student.studentId;
              const marks = marksData[stu._id] || {};

              return (
                <tr key={stu._id}>
                  <td className="p-2 border text-center">{stu.roll}</td>
                  <td className="p-2 border text-center">{stu.name}</td>
                  <td className="p-2  flex flex-col items-center justify-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${stu.profileImg}`}
                      alt={`${stu.name || "image"}`}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    {marks.mcqMark || 0}
                  </td>
                  <td className="p-2 border text-center">
                    {marks.cqMark || 0}
                  </td>
                  <td className="p-2 border text-center">
                    {marks.practicalMark || 0}
                  </td>
                  <td className="p-2 border text-center">
                    {marks.plainMark || 0}
                  </td>
                  <td className="p-2 border text-center">
                    {marks.mcqMark ||
                      0 + marks.cqMark ||
                      0 + marks.practicalMark ||
                      0 + marks.plainMark ||
                      0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadOnlyResults;

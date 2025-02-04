import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { AxiosError } from "axios";
import "../../../../styles/swal.css";
// Save student mark
const saveStudentMarks = async (payload: any) => {
  const response = await axiosInstance.post(
    "/exam-results/create-or-update",
    payload
  );

  return response.data;
};
// Fetch functions
const fetchExams = async () => {
  const response = await axiosInstance.get("/exams");
  // console.log("1 fetch exams", response.data.data);
  return response.data.data;
};

const fetchStudents = async ({ queryKey }) => {
  const [, examId] = queryKey;
  const response = await axiosInstance.get(
    `/exam-registrations?examId=${examId}`
  );
  // console.log("2 fetch students", response.data.data);
  return response.data.data;
};

const fetchResults = async ({ queryKey }) => {
  const [, examId, examSubjectId] = queryKey;
  const response = await axiosInstance.get(
    `/exam-results?examId=${examId}&examSubjectId=${examSubjectId}`
  );
  // console.log("3 fetch result", response.data.data);
  return response.data.data;
};

// Mark Entry Component
const MarkEntry = () => {
  const [selectedExamId, setSelectedExamId] = useState(""); // 1.examId
  const [selectedSubjectId, setSelectedSubjectId] = useState(""); // 2.examSubjectId
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [students, setStudents] = useState([]);
  const queryClient = useQueryClient();

  // handle subject change along with teacher id
  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    const teacherId =
      e.target.options[e.target.selectedIndex].dataset.teacherId;

    setSelectedSubjectId(subjectId);
    setSelectedTeacherId(teacherId);
  };

  // Fetch Exams
  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });

  // Fetch Registered Students
  const { data: registeredStudents } = useQuery({
    queryKey: ["students", selectedExamId],
    queryFn: fetchStudents,
    enabled: !!selectedExamId,
  });

  // Fetch Exam Results
  const { data: results } = useQuery({
    queryKey: ["results", selectedExamId, selectedSubjectId],
    queryFn: fetchResults,
    enabled: !!selectedExamId && !!selectedSubjectId,
  });

  // Combine Students and Marks Data For The Final Mark Table
  useEffect(() => {
    if (registeredStudents && results) {
      const studentMarksMap = results.reduce((acc, result) => {
        acc[result.studentId._id] = result.marks;
        return acc;
      }, {});

      const combinedStudents = registeredStudents.map((registration) => ({
        ...registration,
        marks: studentMarksMap[registration.studentId._id] || {},
      }));

      setStudents(combinedStudents);
      // Initialize marksData state
      const initialMarksData = combinedStudents.reduce((acc, student) => {
        acc[student.studentId._id] = student.marks;
        return acc;
      }, {});
      setMarksData(initialMarksData);
    }
  }, [registeredStudents, results]);

  // Save Marks Mutation
  // const { mutate: saveMark } = useMutation({
  //   mutationFn: saveStudentMarks,
  //   onSuccess: () => {
  //     Swal.fire("Success", "Marks saved successfully!", "success");
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     Swal.fire("Error", "Failed to save marks. Try again.", "error");
  //   },
  // });

  // Mutation for saving student marks (single student)
  const mutation = useMutation({
    mutationFn: saveStudentMarks,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Student marks saved successfully.",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["saveMark"] });
    },
    onError: (err: AxiosError) => {
      handleAxiosError(err, "Failed to save student marks");
    },
  });

  // Modify this function to handle individual student submission
  function handleSubmitStudentMarks(studentId) {
    if (!selectedSubjectId) {
      Swal.fire("Error", "Please select a subject", "error");
      return;
    }

    const studentMarks = marksData[studentId] || {};
    const payload = {
      examId: selectedExamId,
      examSubjectId: selectedSubjectId,
      studentId: studentId,
      teacherId: selectedTeacherId,
      marks: {
        mcqMark: studentMarks.mcqMark || 0,
        cqMark: studentMarks.cqMark || 0,
        practicalMark: studentMarks.practicalMark || 0,
        plainMark: studentMarks.plainMark || 0,
      },
    };

    // console.log("save mark studentId", studentId);
    // console.log("save mark payload", payload);
    mutation.mutate(payload);
  }

  // Handle Exam Change
  function handleExamChange(event) {
    const examId = event.target.value;
    setSelectedExamId(examId);

    const selectedExam = exams.find((exam) => exam._id === examId);
    if (selectedExam) {
      setSubjects(selectedExam.subjects);
    }
  }

  // Handle input change for marks
  const handleMarkChange = (studentId, field, value) => {
    setMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        Mark Entry
      </h1>

      <div className="max-w-2xl mx-auto">
        {/* Exam Selection */}
        <label className="block font-medium text-gray-700 mb-2">
          Select Exam
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={selectedExamId}
          onChange={handleExamChange}
        >
          <option value="">Choose an exam</option>
          {exams?.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.name} ({exam.year})
            </option>
          ))}
        </select>

        {/* Subject Selection */}
        <label className="block font-medium text-gray-700 mb-2">
          Select Subject
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={selectedSubjectId}
          onChange={handleSubjectChange}
          disabled={!subjects.length}
        >
          <option value="">Choose a subject</option>
          {subjects.map((subject) => (
            <option
              key={subject._id}
              value={subject._id}
              data-teacher-id={subject.subjectTeacher._id}
            >
              {subject.name} | {subject.subjectTeacher.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mark Table For All Students */}
      <table className="w-full mt-6 border border-gray-300">
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">MCQ</th>
            <th className="p-2 border">CQ</th>
            <th className="p-2 border">Practical</th>
            <th className="p-2 border">Plain</th>
            <th className="p-2 border">Submit</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {students.map((student) => {
            const stu = student.studentId;
            const marks = marksData[stu._id] || {};

            return (
              <tr key={stu._id}>
                <td className="p-2 border">{stu.name}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={marks.mcqMark || 0}
                    onChange={(e) =>
                      handleMarkChange(
                        stu._id,
                        "mcqMark",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={marks.cqMark || 0}
                    onChange={(e) =>
                      handleMarkChange(
                        stu._id,
                        "cqMark",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={marks.practicalMark || 0}
                    onChange={(e) =>
                      handleMarkChange(
                        stu._id,
                        "practicalMark",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={marks.plainMark || 0}
                    onChange={(e) =>
                      handleMarkChange(
                        stu._id,
                        "plainMark",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <button
                    className="p-1 bg-blue-500 text-white rounded"
                    onClick={() => handleSubmitStudentMarks(stu._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarkEntry;

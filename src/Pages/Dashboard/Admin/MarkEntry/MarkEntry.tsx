import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

function MarkEntry() {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [marksData, setMarksData] = useState<Record<string, any>>({});

  const teacherId = "PUT_CURRENT_TEACHER_ID_HERE"; 
  // In real usage, get teacherId from localStorage or global auth context

  // 1. Fetch all exams for the teacher:
  useEffect(() => {
    async function fetchTeacherExams() {
      // For simplicity, we fetch all and filter client-side, or create a dedicated endpoint
      const res = await axiosInstance.get("/exams");
      const allExams = res.data.data;
      // Filter subdocs where subjectTeacher = teacherId 
      // Or let the teacher pick an exam and subject from the entire list
      setExams(allExams);
    }
    fetchTeacherExams();
  }, []);

  // 2. When teacher selects an exam, find its subjects for which teacher = teacherId
  useEffect(() => {
    if (!selectedExamId) return;
    const exam = exams.find((e) => e._id === selectedExamId);
    if (!exam) return;
    // Filter only the subjects referencing teacherId
    const teacherSubjects = exam.subjects.filter((s: any) => s.subjectTeacher === teacherId);
    setSubjects(teacherSubjects);
  }, [selectedExamId, exams, teacherId]);

  // 3. Fetch all exam registrations for the selected exam to get the students
  useEffect(() => {
    async function fetchRegistrations() {
      if (!selectedExamId) return;
      const res = await axiosInstance.get(`/exam-registrations?examId=${selectedExamId}`);
      setRegistrations(res.data.data || []);
    }
    fetchRegistrations();
  }, [selectedExamId]);

  // 4. Mutation to create/update marks
  const { mutate: saveMark } = useMutation({
    mutationFn: async (payload: any) => {
      return axiosInstance.post("/exam-results/create-or-update", payload);
    },
    onSuccess: () => {
      console.log("Mark saved successfully");
    },
    onError: (err: any) => {
      console.error(err);
      alert("Error saving mark");
    },
  });

  function handleSaveAll() {
    if (!selectedSubjectId) {
      alert("Please select a subject");
      return;
    }
    registrations.forEach((reg) => {
      const sid = reg.studentId._id;
      const inputMarks = marksData[sid] || {};
      const payload = {
        examId: selectedExamId,
        examSubjectId: selectedSubjectId, 
        studentId: sid,
        teacherId,
        marks: {
          mcqMark: inputMarks.mcqMark ?? 0,
          cqMark: inputMarks.cqMark ?? 0,
          practicalMark: inputMarks.practicalMark ?? 0,
          plainMark: inputMarks.plainMark ?? 0,
        },
      };
      saveMark(payload);
    });
    alert("Marks submitted!");
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mark Entry (Teacher)</h2>
      {/* Step 1: Choose an exam */}
      <label>Exam:</label>
      <select
        value={selectedExamId}
        onChange={(e) => setSelectedExamId(e.target.value)}
      >
        <option value="">Select Exam</option>
        {exams.map((ex: any) => (
          <option key={ex._id} value={ex._id}>
            {ex.name} - {ex.year}/{ex.class}/{ex.shift}
          </option>
        ))}
      </select>

      {/* Step 2: Choose a subject from that exam that references this teacher */}
      <label>Subject:</label>
      <select
        value={selectedSubjectId}
        onChange={(e) => setSelectedSubjectId(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((sub: any) => (
          <option key={sub._id} value={sub._id}>
            {sub.name} ({sub.code})
          </option>
        ))}
      </select>

      {/* Step 3: Display students from registrations */}
      <table style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>MCQ</th>
            <th>CQ</th>
            <th>Practical</th>
            <th>Plain</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => {
            const stu = reg.studentId;
            return (
              <tr key={stu._id}>
                <td>{stu.name}</td>
                <td>
                  <input
                    type="number"
                    value={marksData[stu._id]?.mcqMark || ""}
                    onChange={(e) =>
                      setMarksData((prev) => ({
                        ...prev,
                        [stu._id]: {
                          ...prev[stu._id],
                          mcqMark: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={marksData[stu._id]?.cqMark || ""}
                    onChange={(e) =>
                      setMarksData((prev) => ({
                        ...prev,
                        [stu._id]: {
                          ...prev[stu._id],
                          cqMark: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={marksData[stu._id]?.practicalMark || ""}
                    onChange={(e) =>
                      setMarksData((prev) => ({
                        ...prev,
                        [stu._id]: {
                          ...prev[stu._id],
                          practicalMark: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={marksData[stu._id]?.plainMark || ""}
                    onChange={(e) =>
                      setMarksData((prev) => ({
                        ...prev,
                        [stu._id]: {
                          ...prev[stu._id],
                          plainMark: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={handleSaveAll} style={{ marginTop: "1rem" }}>
        Save All
      </button>
    </div>
  );
}

export default MarkEntry;

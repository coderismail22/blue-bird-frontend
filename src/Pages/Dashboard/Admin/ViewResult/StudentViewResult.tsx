// TODO: Add multiple types
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";

function StudentViewResults() {
  const studentId = "67a0ad7b0aef8cec2bf215b1"; // from context or local storage
  const name = "Ismail"; // from context or local storage
  const [exams, setExams] = useState<any[]>([]); //when student comes to this page auto load the exam matching exam list
  const [selectedExamId, setSelectedExamId] = useState(""); // when student picks an exam
  const [results, setResults] = useState<any[]>([]); // fetches and sets the result for the selected exam
  const [examInfo, setExamInfo] = useState<any>(null); // fetches and sets the subject details for the selected exam

  useEffect(() => {
    // 1) Based on the student's profile (year, version, class, shift, etc.),
    // fetch matching exams.
    // For example, if student is year=2025, version=Bangla, class=10, shift=Morning, section=A, group=Science
    axiosInstance
      .get(
        "/exams?year=2025&version=Bangla&class=9&shift=Morning&section=A&group=Science"
      )
      .then((res) => {
        // console.log("initial response", res.data.data);
        setExams(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // When the student picks an exam
  async function handleSelectExam(examId: string) {
    setSelectedExamId(examId);

    // 2) Optionally fetch the exam doc for subject details
    const examRes = await axiosInstance.get(`/exams/${examId}`);
    setExamInfo(examRes.data.data);
    // console.log("🚀 examRes", examRes.data.data);

    // 3) Then fetch the results for that exam + this student
    const resultRes = await axiosInstance.get(
      `/exam-results?examId=${examId}&studentId=${studentId}`
    );
    // console.log("🚀 resultRes:", resultRes.data.data);
    setResults(resultRes.data.data);
  }

  // Merge logic: if examInfo has subjects, match them with results
  {
    console.log("examInfo", examInfo);
  }
  {
    console.log("results", results);
  }
  const mergedSubjects =
    examInfo?.subjects?.map((sub: any) => {
      const found = results.find((r: any) => r.examSubjectId._id === sub._id);
      console.log("spread subject", { ...sub });
      console.log("found marks", found?.marks);
      return {
        ...sub,
        marks: found?.marks || null,
      };
    }) || [];

  return (
    <div>
      <p className="text-center text-2xl mb-5">Welcome, {name}</p>

      {/* Dropdown of student's available exams */}
      <div className="max-w-md">
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Select Exam:{" "}
        </label>
        <select
          value={selectedExamId}
          onChange={(e) => handleSelectExam(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md"
        >
          <option value="">Choose an exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.name} ({exam.year}, {exam.class}, {exam.shift})
            </option>
          ))}
        </select>
      </div>

      {/* If user selected an exam, display the subjects + marks */}
      {selectedExamId && examInfo && (
        <>
          {/* <h3>{examInfo.name}</h3> */}
          {/* <h3>{examInfo._id}</h3> */}
          <table className="w-full mt-6 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">MCQ</th>
                <th className="p-2 border">CQ</th>
                <th className="p-2 border">Practical</th>
                <th className="p-2 border">Plain</th>
                <th className="p-2 border">Total</th>
                {/* <th className="p-2 border">Grade (Optional)</th> */}
              </tr>
            </thead>
            <tbody>
              {console.log("merged subjects", mergedSubjects)}
              {mergedSubjects.map((s: any) => (
                <tr key={s._id} className="text-center">
                  <td className="p-2 border">{s.name}</td>
                  <td className="p-2 border">{s.marks?.mcqMark ?? 0}</td>
                  <td className="p-2 border">{s.marks?.cqMark ?? 0}</td>
                  <td className="p-2 border">{s.marks?.practicalMark ?? 0}</td>
                  <td className="p-2 border">{s.marks?.plainMark ?? 0}</td>
                  <td className="p-2 border">{s.marks?.totalMark ?? 0}</td>
                  {/* <td className="p-2 border">Grade</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default StudentViewResults;

// const Attendance = () => {
//   const [filters, setFilters] = useState({});
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});

//   const fetchStudents = async () => {
//     const response = await axios.get(
//       `/api/students?${new URLSearchParams(filters).toString()}`
//     );
//     setStudents(response.data.data);
//   };

//   const handleAttendanceChange = (studentId, status) => {
//     setAttendance((prev) => ({ ...prev, [studentId]: status }));
//   };

//   const submitAttendance = async () => {
//     const attendanceData = Object.entries(attendance).map(
//       ([studentId, status]) => ({
//         studentId,
//         status,
//       })
//     );
//     await axios.post("/api/attendance", { attendance: attendanceData });
//     alert("Attendance submitted!");
//   };

//   return (
//     <div>
//       <h1>Mark Attendance</h1>
//       {/* Dropdowns */}
//       {/* Render students */}
//       {students.map((student) => (
//         <div key={student._id}>
//           <span>{student.name}</span>
//           <select
//             onChange={(e) =>
//               handleAttendanceChange(student._id, e.target.value)
//             }
//           >
//             <option value="Present">Present</option>
//             <option value="Absent">Absent</option>
//             <option value="Late">Late</option>
//           </select>
//         </div>
//       ))}
//       <button onClick={submitAttendance}>Submit Attendance</button>
//     </div>
//   );
// };

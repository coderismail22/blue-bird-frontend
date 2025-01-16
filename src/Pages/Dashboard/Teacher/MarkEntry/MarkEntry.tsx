// import { useState, useEffect } from "react";
// import axios from "axios";

// const MarkEntry = () => {
//   const [filters, setFilters] = useState({
//     year: "",
//     version: "",
//     className: "",
//     shift: "",
//     section: "",
//   });
//   const [students, setStudents] = useState([]);

//   const fetchStudents = async () => {
//     const { year, version, className, shift, section } = filters;
//     const query = new URLSearchParams({
//       year,
//       version,
//       class: className,
//       shift,
//       section,
//     }).toString();
//     const response = await axios.get(`/api/students?${query}`);
//     setStudents(response.data.data);
//   };

//   useEffect(() => {
//     if (Object.values(filters).every((v) => v)) fetchStudents();
//   }, [filters]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <div>
//       <h1>Mark Entry</h1>
//       {/* Dropdowns */}
//       <select onChange={(e) => handleFilterChange("year", e.target.value)}>
//         <option value="">Select Year</option>
//         {/* Options */}
//       </select>
//       {/* Other dropdowns... */}

//       {/* Students */}
//       {students.length > 0 && (
//         <form>
//           {students.map((student) => (
//             <div key={student._id}>
//               <span>{student.name}</span>
//               <input
//                 type="number"
//                 name={`marks-${student._id}`}
//                 placeholder="Enter marks"
//               />
//             </div>
//           ))}
//           <button type="submit">Submit Marks</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default MarkEntry;

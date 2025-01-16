// import axiosInstance from "@/api/axiosInstance";
// import { useState } from "react";

// const StudentResult = () => {
//   const [filters, setFilters] = useState({});
//   const [results, setResults] = useState([]);

//   const fetchResults = async () => {
//     const response = await axiosInstance.get(
//       `/api/results?${new URLSearchParams(filters).toString()}`
//     );
//     setResults(response.data.data);
//   };

//   return (
//     <div>
//       <h1>View Results</h1>
//       {/* Dropdowns */}
//       <button onClick={fetchResults}>Fetch Results</button>

//       {/* Render Results */}
//       <table>
//         <thead>
//           <tr>
//             <th>Subject</th>
//             <th>Marks</th>
//             <th>Total Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((result) => (
//             <tr key={result._id}>
//               <td>{result.subject}</td>
//               <td>{result.marks}</td>
//               <td>{result.totalMarks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

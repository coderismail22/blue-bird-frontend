export const MarkTable = ({
  students,
  marksData,
  onMarkChange,
  onSubmit,
}: any) => (
  <table className="w-full mt-6 border border-gray-300">
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
    <tbody>
      {students.map((student: any) => {
        const stu = student.studentId;
        const marks = marksData[stu._id] || {};

        return (
          <tr key={stu._id}>
            <td className="p-2 border">{stu.name}</td>
            <td className="p-2 border">
              <input
                value={marks.mcqMark || 0}
                onChange={(e) =>
                  onMarkChange(stu._id, "mcqMark", Number(e.target.value))
                }
              />
            </td>
            <td className="p-2 border">
              <input
                value={marks.cqMark || 0}
                onChange={(e) =>
                  onMarkChange(stu._id, "cqMark", Number(e.target.value))
                }
              />
            </td>
            <td className="p-2 border">
              <input
                value={marks.practicalMark || 0}
                onChange={(e) =>
                  onMarkChange(stu._id, "practicalMark", Number(e.target.value))
                }
              />
            </td>
            <td className="p-2 border">
              <input
                value={marks.plainMark || 0}
                onChange={(e) =>
                  onMarkChange(stu._id, "plainMark", Number(e.target.value))
                }
              />
            </td>
            <td className="p-1">
              <Button
                className="bg-blue-500 hover:bg-blue-400 text-white rounded"
                onClick={() => onSubmit(stu._id)}
              >
                Submit
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

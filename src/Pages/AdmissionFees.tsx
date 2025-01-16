import { motion } from "framer-motion";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";

const FeesAndPayment = () => {
  const feeData = [
    { class: "Play", admissionFee: "$100", tuitionFee: "$200/month", examFee: "$20" },
    { class: "Class 1", admissionFee: "$120", tuitionFee: "$250/month", examFee: "$25" },
    { class: "Class 5", admissionFee: "$150", tuitionFee: "$300/month", examFee: "$30" },
    { class: "Class 10", admissionFee: "$200", tuitionFee: "$350/month", examFee: "$35" },
    { class: "Class 12", admissionFee: "$250", tuitionFee: "$400/month", examFee: "$40" },
  ];

  return (
   <>
   
   
   <section className="bg-gray-100 py-12 px-4 my-20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800">Fees and Payment</h2>
          <p className="text-gray-600 mt-4">
            A comprehensive list of fees for each class, including admission, tuition, and exam fees.
          </p>
        </motion.div>

        {/* Fee Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table className="min-w-full bg-white rounded-lg shadow-2xl">
            {/* Table Header */}
            
             <TableHeader className="bg-cyan-300 text-center">
                <TableHead className="px-4 py-2">Class</TableHead>
                <TableHead className="px-4 py-2">Admission Fee</TableHead>
                <TableHead className="px-4 py-2">Tuition Fee</TableHead>
                <TableHead className="px-4 py-2">Exam Fee</TableHead>
                </TableHeader>
            
            {/* Table Body */}
            <TableBody>
              {feeData.map((fee, index) => (
                <TableRow
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors font-bold`}
                >
                  <TableCell className="px-4 py-2 text-gray-800">{fee.class}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-600">{fee.admissionFee}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-600">{fee.tuitionFee}</TableCell>
                  <TableCell className="px-4 py-2 text-gray-600">{fee.examFee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
   </>
  );
};

export default FeesAndPayment;

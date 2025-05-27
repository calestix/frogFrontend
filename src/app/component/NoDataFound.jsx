import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

export default function NoDataFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg bg-white border border-gray-200 max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
        <FileQuestion className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Data Found</h2>
    </motion.div>
  );
}

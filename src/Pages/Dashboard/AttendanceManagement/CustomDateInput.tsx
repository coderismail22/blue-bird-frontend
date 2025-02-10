import { useRef } from "react";

const CustomDateInput = ({ register }) => {
  const dateRef = useRef(null);

  return (
    <div
      className="relative w-full cursor-pointer"
      onClick={() => dateRef.current?.showPicker()} // Opens the date picker
    >
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        Date
      </label>

      <div className="relative">
        <input
          type="date"
          ref={dateRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:shadow-md cursor-pointer"
          {...register("date")}
        />
        {/* Custom Calendar Icon */}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          📅
        </span>
      </div>
    </div>
  );
};

export default CustomDateInput;

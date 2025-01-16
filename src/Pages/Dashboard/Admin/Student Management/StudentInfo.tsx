import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";

const StudentInfo = () => {
  const [years, setYears] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");

  useEffect(() => {
    // Fetch available years when the component mounts
    axiosInstance.get("/api/students/years").then((response) => {
      setYears(response.data);
    });
  }, []);

  const handleYearChange = async (year: string) => {
    setSelectedYear(year);
    setSelectedVersion("");
    setClasses([]);
    setSections([]);

    // Fetch versions for the selected year
    const response = await axiosInstance.get(`/api/students/versions/${year}`);
    setVersions(response.data);
  };

  const handleVersionChange = async (version: string) => {
    setSelectedVersion(version);
    setClasses([]);
    setSections([]);

    // Fetch classes for the selected year and version
    const response = await axiosInstance.get(
      `/api/students/classes/${selectedYear}/${version}`
    );
    setClasses(response.data);
  };

  const handleClassChange = async (className: string) => {
    setSelectedClass(className);
    setSections([]);

    // Fetch sections for the selected year, version, and class
    const response = await axiosInstance.get(
      `/api/students/sections/${selectedYear}/${selectedVersion}/${className}`
    );
    setSections(response.data);
  };

  return (
    <div className="dropdown-container">
      <h1>Dependent Dropdowns</h1>
      <div>
        <label>Year:</label>
        <select
          onChange={(e) => handleYearChange(e.target.value)}
          value={selectedYear}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Version:</label>
        <select
          onChange={(e) => handleVersionChange(e.target.value)}
          value={selectedVersion}
          disabled={!selectedYear}
        >
          <option value="">Select Version</option>
          {versions.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Class:</label>
        <select
          onChange={(e) => handleClassChange(e.target.value)}
          value={selectedClass}
          disabled={!selectedVersion}
        >
          <option value="">Select Class</option>
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Shift:</label>
        <select disabled={!selectedClass}>
          <option value="">Select Shift</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <div>
        <label>Section:</label>
        <select disabled={!selectedClass}>
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StudentInfo;

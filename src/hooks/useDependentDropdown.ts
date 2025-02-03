// src/hooks/useDependentDropdown.ts
import { useState } from "react";

export function useDependentDropdown() {
  const [year, setYear] = useState("");
  const [version, setVersion] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [group, setGroup] = useState("");

  // You can also load these from the backend or local enumerations
  const yearOptions = ["2025", "2026", "2027"];
  const versionOptions = ["Bangla", "English"];
  const classOptions = ["6", "7", "8", "9", "10", "11", "12"];
  const shiftOptions = ["Morning", "Day", "Evening"];
  const sectionOptions = ["A", "B", "C"];
  const groupOptions = ["Science", "Commerce", "Arts", "NA"];

  // Return the states and setters
  return {
    year,
    setYear,
    version,
    setVersion,
    classLevel,
    setClassLevel,
    shift,
    setShift,
    section,
    setSection,
    group,
    setGroup,
    yearOptions,
    versionOptions,
    classOptions,
    shiftOptions,
    sectionOptions,
    groupOptions,
  };
}

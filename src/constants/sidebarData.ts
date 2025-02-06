import {
  FaBook,
  FaBookReader,
  FaCartArrowDown,
  FaChalkboardTeacher,
  FaHome,
  FaRegListAlt,
} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";

import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";

import {
  MdEditDocument,
  MdEmojiEvents,
  MdEventNote,
  MdOutlineNoteAlt,
} from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import {
  FaMoneyCheckDollar,
  FaPeopleGroup,
  FaPeopleRoof,
} from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiLightBulb } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";
import { BsClipboardDataFill } from "react-icons/bs";

export const sidebarData = {
  superAdmin: [
    // { label: "Home", path: "/", icon: FaHome },
    { label: "Add Batch", path: "/dashboard/admin/batch", icon: FaBookReader },
    { label: "Orders", path: "/dashboard/admin/orders", icon: FaCartArrowDown },
    {
      label: "Payments",
      path: "/dashboard/admin/payments",
      icon: FaMoneyCheckDollar,
    },
    // TODO: Add Route/Outline like PH
    // {
    //   label: "Add Route/Outline",
    //   path: "/dashboard/admin/home",
    //   icon: MdDocumentScanner,
    // },
    {
      label: "Add Category",
      path: "/dashboard/admin/categories",
      icon: BiCategory,
    },
    {
      icon: FaChalkboardTeacher,
      label: "Teacher Management",
      children: [
        {
          icon: IoMdAddCircleOutline,
          label: "Add Teacher",
          path: "/dashboard/admin/teacher-management/create-teacher",
        },
        {
          icon: FaRegListAlt,
          label: "All Teachers",
          path: "/dashboard/admin/teacher-management/all-teachers",
        },
      ],
    },
    {
      label: "Course Management",
      icon: FaBook,
      children: [
        {
          icon: CiBoxList,
          label: "Course",
          path: "/dashboard/admin/course-management/create-course",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Course",
              path: "/dashboard/admin/course-management/create-course",
            },
            // {
            //   icon: FaLink,
            //   label: "Link Subject To Course",
            //   path: "/dashboard/admin/course-management/link-subject-to-course",
            // },
            {
              icon: FaRegListAlt,
              label: "All Courses",
              path: "/dashboard/admin/course-management/all-courses",
            },
          ],
        },
        {
          icon: CiBoxList,
          label: "Subject",
          path: "/dashboard/admin/subject-management/create-subject",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Subject",
              path: "/dashboard/admin/subject-management/create-subject",
            },
            {
              icon: FaRegListAlt,
              label: "All Subjects",
              path: "/dashboard/admin/subject-management/all-subjects",
            },
          ],
        },
        {
          label: "Topic",
          icon: CiBoxList,
          path: "/dashboard/admin/topic-management/create-topic",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Topic",
              path: "/dashboard/admin/topic-management/create-topic",
            },
            {
              icon: FaRegListAlt,
              label: "All Topics",
              path: "/dashboard/admin/topic-management/all-topics",
            },
          ],
        },
        {
          icon: CiBoxList,
          label: "Lesson",
          path: "/dashboard/admin/lesson-management/create-lesson",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Lesson",
              path: "/dashboard/admin/lesson-management/create-lesson",
            },
            {
              icon: FaRegListAlt,
              label: "All Lessons",
              path: "/dashboard/admin/lesson-management/all-lessons",
            },
          ],
        },
      ],
    },
  ],
  admin: [
    { label: "Home", path: "/dashboard/admin/admin-profile", icon: FaHome },
    {
      label: "Notice Banner",
      path: "/dashboard/admin/banner-notice",
      icon: HiLightBulb,
    },
    {
      label: "Publish Notice",
      path: "/dashboard/admin/notice",
      icon: MdEventNote,
    },
    {
      label: "Publish Event",
      path: "/dashboard/admin/event",
      icon: MdEmojiEvents,
    },
    {
      icon: FaChalkboardTeacher,
      label: "Teacher Management",
      children: [
        {
          icon: IoMdAddCircleOutline,
          label: "Add Teacher",
          path: "/dashboard/admin/teacher-management/create-teacher",
        },
        {
          icon: FaRegListAlt,
          label: "All Teachers",
          path: "/dashboard/admin/teacher-management/all-teachers",
        },
      ],
    },
    {
      icon: PiStudentFill,
      label: "Student Management",
      children: [
        {
          icon: IoMdAddCircleOutline,
          label: "Register Student",
          path: "/dashboard/admin/student-management/register-student",
        },
        {
          icon: FaRegListAlt,
          label: "All Students",
          path: "/dashboard/admin/student-management/student-info-page",
        },
      ],
    },
    {
      icon: MdEditDocument,
      label: "Exam Management",
      children: [
        {
          icon: IoMdAddCircleOutline,
          label: "Add Subject",
          path: "/dashboard/admin/exam-management/add-subject",
        },
        {
          icon: FaRegListAlt,
          label: "View Subjects",
          path: "/dashboard/admin/exam-management/view-subjects",
        },
        {
          icon: IoMdAddCircleOutline,
          label: "Add Exam",
          path: "/dashboard/admin/exam-management/add-exam",
        },
        {
          icon: FaRegListAlt,
          label: "View Exams",
          path: "/dashboard/admin/exam-management/view-exams",
        },
        {
          icon: GiArchiveRegister,
          label: "Exam Registration",
          path: "/dashboard/admin/exam-management/exam-registration",
        },
        {
          icon: FaRegListAlt,
          label: "View Registration",
          path: "/dashboard/admin/exam-management/exam-registered-students",
        },
        {
          icon: MdOutlineNoteAlt,
          label: "Mark Entry",
          path: "/dashboard/teacher/mark-entry",
        },
        {
          icon: BsClipboardDataFill,
          label: "Exam Results ",
          path: "/dashboard/admin/exam-management/view-exam-results",
        },
      ],
    },

    {
      icon: FaPeopleRoof,
      label: "Administration ",
      path: "/dashboard/admin/administration",
    },
  ],
  teacher: [
    { label: "Home", path: "/dashboard/teacher/teacher-profile", icon: FaHome },
    {
      icon: FaPeopleGroup,
      label: "Attendance",
      path: "/dashboard/admin/attendance-management/take-attendance",
    },
    {
      icon: MdOutlineNoteAlt,
      label: "Mark Entry",
      path: "/dashboard/teacher/teacher-only-mark-entry",
    },
    {
      icon: IoMdSearch,
      label: "See Results",
      path: "/dashboard/see-student-results",
    },
  ],
  student: [
    { label: "Home", path: "/dashboard/student/student-profile", icon: FaHome },
    {
      icon: BsClipboardDataFill,
      label: "Exam Result ",
      path: "/dashboard/student/exam-result",
    },
    // Upcoming Features: Routine, Notice, Events
  ],
};

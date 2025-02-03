import {
  FaBook,
  FaBookReader,
  FaCartArrowDown,
  // FaCartArrowDown,
  FaChalkboardTeacher,
  FaHome,
  FaRegListAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";

import { IoMdAddCircleOutline } from "react-icons/io";

import {
  MdDownloading,
  MdEditDocument,
  MdEmojiEvents,
  MdEventNote,
  MdOutlineNoteAlt,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaMoneyCheckDollar, FaPeopleRoof } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { HiLightBulb } from "react-icons/hi";

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
    // { label: "Home", path: "/dashboard/admin/home", icon: FaHome },
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
          label: "Students",
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
          label: "Exam Archive",
          path: "/dashboard/admin/exam-management/exam-archive",
        },
      ],
    },
    {
      icon: MdOutlineNoteAlt,
      label: "Attendance",
      children: [
        {
          icon: IoMdAddCircleOutline,
          label: "Attendance",
          path: "/dashboard/admin/attendance-management/take-attendance",
        },
      ],
    },
    {
      label: "Administration ",
      path: "/dashboard/admin/administration",
      icon: FaPeopleRoof,
    },
    {
      label: "Exam Result ",
      path: "/dashboard/student/exam-result",
      icon: FaPeopleRoof,
    },
  ],
  instructor: [
    { label: "Home", path: "/dashboard/instructor/home", icon: FaHome },
  ],
  student: [
    { label: "Home", path: "/dashboard/student/home", icon: FaHome },
    // { label: "Cart", path: "/dashboard/student/cart", icon: FaCartArrowDown },
    {
      label: "Courses",
      icon: FaUserGraduate,
      children: [
        {
          icon: MdOutlinePlayLesson,
          label: "Enrolled Courses",
          path: "/dashboard/student/courses/enrolled-courses",
        },
        {
          icon: MdDownloading,
          label: "Pending Courses",
          path: "/dashboard/student/courses/pending-courses",
        },
      ],
    },
  ],
};

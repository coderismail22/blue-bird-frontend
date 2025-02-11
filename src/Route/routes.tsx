import MainLayout from "@/Layout/MainLayout";
import AboutUs from "@/Pages/AboutUs";
import ContactInfo from "@/Pages/Contact";
import GalleryPage from "@/Pages/GallaryPage";
import Home from "@/Pages/Home";
import NotFoundPage from "@/Pages/NotFoundPage";
import NoticeBoardPage from "@/Pages/NoticeBoard";
import { createBrowserRouter } from "react-router-dom";
import Administration from "@/Pages/Administration/AdministrationPage";
import AdmissionPage from "@/Pages/AdmissionPage";
import Dashboard from "@/Pages/Dashboard/Dashboard/Dashboard";
import AllNotice from "@/Pages/Dashboard/Admin/Notice/AllNotice";
import PublishNotice from "@/Pages/Dashboard/Admin/Notice/PublishNotice";
import EditNotice from "@/Pages/Dashboard/Admin/Notice/EditNotice";
import AllEvent from "@/Pages/Dashboard/Admin/Event/AllEvent";
import PublishEvent from "@/Pages/Dashboard/Admin/Event/PublishEvent";
import EditEvent from "@/Pages/Dashboard/Admin/Event/EditEvent";
import AddTeacher from "@/Pages/Dashboard/Admin/Teacher Management/AddTeacher";
import RegisterStudent from "@/Pages/Dashboard/Admin/Student Management/RegisterStudent";
import StudentInfo from "@/Pages/Dashboard/Admin/Student Management/StudentInfo";
import AllAdministration from "@/Pages/Dashboard/Admin/Administration/AllAdministration";
import PublishAdministration from "@/Pages/Dashboard/Admin/Administration/PublishAdministration";
import EditAdministration from "@/Pages/Dashboard/Admin/Administration/EditAdministration";
import NoticeBanner from "@/Pages/Dashboard/Admin/NoticeBanner/NoticeBanner";
import Login from "@/components/Auth/Login/Login";
import EditStudent from "@/Pages/Dashboard/Admin/Student Management/EditStudent";
import FullStudentInfo from "@/Pages/Dashboard/Admin/Student Management/FullStudentInfo";
import AddExam from "@/Pages/Dashboard/Admin/Exam Management/AddExam";
import TakeAttendance from "@/Pages/Dashboard/AttendanceManagement/TakeAttendance";
import StudentViewResults from "@/Pages/Dashboard/Admin/ViewResult/StudentViewResult";
import AddSubject from "@/Pages/Dashboard/Admin/Exam Management/AddSubject";
import ExamRegistration from "@/Pages/Dashboard/Admin/Exam Management/ExamRegistration";
import MarkEntry from "@/Pages/Dashboard/Admin/MarkEntry/MarkEntry";
import TeacherOnlyMarkEntry from "@/Pages/Dashboard/Admin/MarkEntry/TeacherOnlyMarkEntry";
import ExamRegisteredStudents from "@/Pages/Dashboard/Admin/Exam Management/ViewRegistrations";
import ReadOnlyResults from "@/Pages/Results";
import TeacherProfile from "@/Pages/Dashboard/Teacher/TeacherProfile/TeacherProfile";
import StudentProfile from "@/Pages/Dashboard/Student/StudentProfile/StudentProfile";
import AdminProfile from "@/Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ViewSubjects from "@/Pages/Dashboard/Admin/ViewSubjects/ViewSubjects";
import ViewExams from "@/Pages/Dashboard/Admin/ViewExams/ViewExams";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AllTeachers from "@/Pages/Dashboard/Admin/Teacher Management/AllTeachers";
import EditTeacher from "@/Pages/Dashboard/Admin/Teacher Management/EditTeacher";
import FullTeacherInfo from "@/Pages/Dashboard/Admin/Teacher Management/FullTeacherInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/administration",
        element: <Administration />,
      },
      {
        path: "/notice",
        element: <NoticeBoardPage />,
      },
      {
        path: "/admission",
        element: <AdmissionPage />,
      },
      // {
      //   path: "/results",
      //   element: <ReadOnlyResults />,
      // },
      {
        path: "/contact",
        element: <ContactInfo />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // Role: Admin
      { path: "/dashboard/admin/profile", element: <AdminProfile /> },
      // Notice Banner
      { path: "/dashboard/admin/banner-notice", element: <NoticeBanner /> },
      // Notice
      { path: "/dashboard/admin/notice", element: <AllNotice /> },
      { path: "/dashboard/admin/publish-notice", element: <PublishNotice /> },
      {
        path: "/dashboard/admin/edit-notice/:noticeId",
        element: <EditNotice />,
      },
      // Event
      { path: "/dashboard/admin/event", element: <AllEvent /> },
      { path: "/dashboard/admin/publish-event", element: <PublishEvent /> },
      {
        path: "/dashboard/admin/edit-event/:eventId",
        element: <EditEvent />,
      },

      // Administration
      {
        path: "/dashboard/admin/administration",
        element: <AllAdministration />,
      },
      {
        path: "/dashboard/admin/publish-administration",
        element: <PublishAdministration />,
      },
      {
        path: "/dashboard/admin/edit-administration/:adminId",
        element: <EditAdministration />,
      },
      // Teacher Management

      {
        path: "/dashboard/admin/teacher-management/create-teacher",
        element: <AddTeacher />,
      },
      {
        path: "/dashboard/admin/teacher-management/full-teacher-info/:teacherId",
        element: <FullTeacherInfo />,
      },
      {
        path: "/dashboard/admin/teacher-management/edit-teacher/:teacherId",
        element: <EditTeacher />,
      },
      {
        path: "/dashboard/admin/teacher-management/all-teachers",
        element: <AllTeachers />,
      },
      // Student Management
      {
        path: "/dashboard/admin/student-management/register-student",
        element: <RegisterStudent />,
      },
      {
        path: "/dashboard/admin/student-management/student-info-page",
        element: <StudentInfo />,
      },
      {
        path: "/dashboard/admin/student-management/edit-student/:studentId",
        element: <EditStudent />,
      },
      {
        path: "/dashboard/admin/student-management/full-student-info/:studentId",
        element: <FullStudentInfo />,
      },
      // Exam Management (TODO:Incomplete)
      {
        path: "/dashboard/admin/exam-management/add-subject",
        element: <AddSubject />,
      },
      {
        path: "/dashboard/admin/exam-management/view-subjects",
        element: <ViewSubjects />,
      },
      {
        path: "/dashboard/admin/exam-management/add-exam",
        element: <AddExam />,
      },
      {
        path: "/dashboard/admin/exam-management/exam-registration",
        element: <ExamRegistration />,
      },
      {
        path: "/dashboard/admin/exam-management/exam-registered-students",
        element: <ExamRegisteredStudents />,
      },
      {
        path: "/dashboard/admin/exam-management/view-exams",
        element: <ViewExams />,
      },
      {
        path: "/dashboard/admin/exam-management/view-exam-results",
        element: <ReadOnlyResults />,
      },
      // Attendance
      {
        path: "/dashboard/admin/attendance-management/take-attendance",
        element: <TakeAttendance />,
      },
      // Role: Teacher
      {
        path: "/dashboard/teacher/profile",
        element: <TeacherProfile />,
      },
      {
        path: "/dashboard/teacher/take-attendance",
        element: <TakeAttendance />,
      },
      {
        path: "/dashboard/teacher/mark-entry",
        element: <MarkEntry />,
      },
      {
        path: "/dashboard/teacher/teacher-only-mark-entry",
        element: <TeacherOnlyMarkEntry />,
      },
      {
        path: "/dashboard/see-student-results",
        element: <ReadOnlyResults />,
      },

      // Role: Student
      {
        path: "/dashboard/student/profile",
        element: <StudentProfile />, //Use role wrapper if needed
      },
      {
        path: "/dashboard/student/exam-result",
        element: <StudentViewResults />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

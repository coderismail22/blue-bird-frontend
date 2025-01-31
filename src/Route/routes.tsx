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
import AdminHome from "@/Pages/Dashboard/Admin/AdminHome/AdminHome";
import AllNotice from "@/Pages/Dashboard/Admin/Notice/AllNotice";
import PublishNotice from "@/Pages/Dashboard/Admin/Notice/PublishNotice";
import EditNotice from "@/Pages/Dashboard/Admin/Notice/EditNotice";
import AllEvent from "@/Pages/Dashboard/Admin/Event/AllEvent";
import PublishEvent from "@/Pages/Dashboard/Admin/Event/PublishEvent";
import EditEvent from "@/Pages/Dashboard/Admin/Event/EditEvent";
import AddTeacher from "@/Pages/Dashboard/Admin/Teacher Management/AddTeacher";
import EditTeacher from "@/Pages/Dashboard/Admin/Student Management/EditStudent";
import AllTeachers from "@/Pages/Dashboard/Admin/Student Management/AllStudents";
import RegisterStudent from "@/Pages/Dashboard/Admin/Student Management/RegisterStudent";
import StudentInfo from "@/Pages/Dashboard/Admin/Student Management/StudentInfo";
import RoleWrapper from "@/components/Auth/RoleWrapper/RoleWrapper";
import StudentHome from "@/Pages/Dashboard/Student/StudentHome/StudentHome";
import { ROLE } from "@/constants/role";
import AllAdministration from "@/Pages/Dashboard/Admin/Administration/AllAdministration";
import PublishAdministration from "@/Pages/Dashboard/Admin/Administration/PublishAdministration";
import EditAdministration from "@/Pages/Dashboard/Admin/Administration/EditAdministration";
import NoticeBanner from "@/Pages/Dashboard/Admin/NoticeBanner/NoticeBanner";
import Login from "@/components/Auth/Login/Login";

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
        path: "/contact",
        element: <ContactInfo />,
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
    children: [
      // Role: Admin
      { path: "/dashboard/admin/home", element: <AdminHome /> },
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
      // Role: Teacher

      // Role: Student
      {
        path: "/dashboard/student/home",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            {/* <Cart /> */}
            <StudentHome />
          </RoleWrapper>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

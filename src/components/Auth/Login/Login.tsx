// import { useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
import AppForm from "@/components/CustomForm/AppForm";
import AppInput from "@/components/CustomForm/AppInput";
import AppInputPassword from "@/components/CustomForm/AppInputPassword";
// import axiosInstance from "@/api/axiosInstance";
import { TLoginForm } from "@/types/login.type";
import { useLogin } from "@/hooks/useLogin";
import { Link } from "react-router-dom";
import LoaderWithBlurBG from "@/components/Loader/LoaderWithBlurBG";
import { Helmet } from "react-helmet";
import { loginSchema } from "./login.schema";
import logo from "../../../assets/logo.png";

const Login = () => {
  const loginMutation = useLogin();

  const onSubmit = (data: TLoginForm) => {
    loginMutation.mutate(data); // Trigger the mutation
  };

  if (loginMutation.isPending)
    return <LoaderWithBlurBG loadingText={"Getting you in - just a moment!"} />;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <Helmet>
        <title>BlueBirdSchool | Login</title>
      </Helmet>
      <div className="w-full max-w-sm p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <div className="flex flex-col items-center justify-center mb-2">
          <Link to="/">
            <img className="w-20" src={logo} alt="Logo" />
          </Link>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-100 mb-8">
          Login to Your Account
        </h2>
        <AppForm
          schema={loginSchema}
          onSubmit={onSubmit}
          buttonText={"Login"}
          submitButtonStyles="bg-blue-500 hover:bg-blue-600 text-white"
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          {/* Email Input */}
          <div className="mb-4">
            <AppInput
              className="w-full mb-4 bg-[#2D394B] border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
              name="email"
              label="Email"
              labelStyles="text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <AppInputPassword
            className="w-full mb-4 bg-gray-700 border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            name="password"
            label="Password"
            labelStyles="text-white"
            placeholder="Enter your password"
          />
        </AppForm>
      </div>
    </div>
  );
};

export default Login;

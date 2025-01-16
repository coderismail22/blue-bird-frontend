import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const handleAxiosError = (
  error: AxiosError<BackendErrorResponse | unknown>,
  title = "Error"
) => {
  // Use type narrowing to access errorSources
  const isBackendError = (data: unknown): data is BackendErrorResponse => {
    return (
      typeof data === "object" &&
      data !== null &&
      "errorSources" in data &&
      Array.isArray((data as BackendErrorResponse).errorSources)
    );
  };

  const errorData = error.response?.data;
  const errorMessages = isBackendError(errorData)
    ? errorData?.errorSources?.map((source) => source.message).join(", ")
    : "Something went wrong. Please try again.";

  Swal.fire({
    icon: "error",
    title,
    text: errorMessages,
    customClass: {
      title: "custom-title",
      popup: "custom-popup",
      icon: "custom-icon",
      confirmButton: "custom-confirm-btn",
    },
  });
};

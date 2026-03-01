"use client";

import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { APIResponse, ISignupFormData } from "../../types";
import { HandleOnSubmit } from "@/types/FormTypes";
import useFormHandler from "@/hooks/useFormhandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signup = async (formData: ISignupFormData): Promise<APIResponse> => {
  try {
    const { data } = await axios.post<APIResponse>("/api/signup", formData);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }

    throw {
      status: 500,
      success: false,
      error: "An unknown error occurred",
    };
  }
};

const useSignup = () => {
  const router = useRouter()

  const { formData, setFormData, handleOnChange } =
    useFormHandler<ISignupFormData>({
      name: "",
      email: "",
      password: "",
    });

  const { mutate, isPending: loading } = useMutation<
    APIResponse,
    APIResponse,
    ISignupFormData
  >({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message || "Success");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      router.push("/create-agency")
    },
    onError: (error) => {
      toast.error(error.error || "Something went wrong");
    },
  });

  const handleOnSubmit = (e: HandleOnSubmit) => {
    e.preventDefault();

    mutate(formData);
  };

  return {
    formData,
    handleOnSubmit,
    handleOnChange,
    loading,
  };
};

export default useSignup;

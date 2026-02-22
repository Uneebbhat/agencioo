"use client";

import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { APIResponse, ILoginFormData } from "../../types";
import { HandleOnSubmit } from "@/types/FormTypes";
import useFormHandler from "@/hooks/useFormhandler";
import { toast } from "sonner";

const login = async (formData: ILoginFormData): Promise<APIResponse> => {
  try {
    const { data } = await axios.post<APIResponse>("/api/login", formData);
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

const useLogin = () => {
  const { mutate, isPending: loading } = useMutation<
    APIResponse,
    APIResponse,
    ILoginFormData
  >({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message || "Success");
      setFormData({
        email: "",
        password: "",
      });
    },
    onError: (error) => {
      toast.error(error.error || "Something went wrong");
    },
  });

  const { formData, setFormData, handleOnChange } = useFormHandler<ILoginFormData>({
    email: "",
    password: "",
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

export default useLogin;

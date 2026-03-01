"use client"

import useFormHandler from "@/hooks/useFormhandler";
import { HandleOnSubmit } from "@/types/FormTypes";
import { APIResponse } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ICreateAgencyFormData {
  agencyName: string,
  agencyEmail: string,
  agencyWebsite: string,
  agencyPhone: string,
  agencyAddress: string,
  agencyCity: string,
  agencyZipcode: string,
  agencyImage: string,
  agencyDescription: string;
}

const createAgency = async (formData: ICreateAgencyFormData): Promise<APIResponse> => {
  try {
    const { data } = await axios.post<APIResponse>("/api/create-agency", formData);
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
}

const useCreateAgency = () => {
  const router = useRouter()

  const { formData, setFormData, handleOnChange } =
    useFormHandler<ICreateAgencyFormData>({
      agencyName: "",
      agencyEmail: "",
      agencyWebsite: "",
      agencyPhone: "",
      agencyAddress: "",
      agencyCity: "",
      agencyZipcode: "",
      agencyImage: "",
      agencyDescription: ""
    });

  const { mutate, isPending: loading } = useMutation<APIResponse, APIResponse, ICreateAgencyFormData>({
    mutationFn: createAgency,
    onSuccess(data) {
      toast.success(data.message || "Success");

      setFormData({
        agencyName: "",
        agencyEmail: "",
        agencyWebsite: "",
        agencyPhone: "",
        agencyAddress: "",
        agencyCity: "",
        agencyZipcode: "",
        agencyImage: "",
        agencyDescription: ""
      })

      router.push("/create-agency/invite")
    },
    onError: (error) => {
      toast.error(error.error || "Something went wrong");
      console.log(error || "Something went wrong");
    },
  })

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
}

export default useCreateAgency
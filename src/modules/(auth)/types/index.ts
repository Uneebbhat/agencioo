export interface ISignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse {
  status: number;
  success: boolean;
  message?: string;
  data?: {
    user: UserDTO;
    token: string;
  };
  error?: string;
}
